from django.shortcuts import render
from django.db.models import Sum, Max
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from django.views import View
from .serializers import UserSerializer, TransactionSerializer, NumberSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Transaction, Category
from django.http import JsonResponse
import json
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now





class GetBarGraphData(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = NumberSerializer(data=request.data)
        if serializer.is_valid():
            month = serializer.validated_data['number']

            # Ensure month input is valid (1-12)
            if not (1 <= month <= 12):
                return JsonResponse({'error': 'Invalid month number'}, status=400)

            # Get current year
            current_year = now().year

            # Filter transactions for the given month and current year
            transactions = Transaction.objects.filter(
                created_at__year=current_year,
                created_at__month=month
            )

            # Process transactions
            returner = {"incoming": 0, "outgoing": 0}
            for transaction in transactions:
                if transaction.amount < 0:
                    returner["outgoing"] -= transaction.amount  # Convert to positive
                else:
                    returner["incoming"] += transaction.amount

            return JsonResponse(returner)

        return JsonResponse({'error': 'Invalid input'}, status=400)


class CategoryPieGraphOutgoing(APIView):
    permission_classes = [IsAuthenticated]  # ✅ Ensures only authenticated users can access

    def get(self, request):
        user = request.user
        print(f"User: {user}")

        # Get only outgoing categories
        outgoing_categories = Category.objects.filter(outgoing=True).values_list("name", flat=True)

        # Get transactions for outgoing categories
        transactions = Transaction.objects.filter(author=user, category__name__in=outgoing_categories)

        # Aggregate transaction amounts by category
        category_data = transactions.values("category__name").annotate(total=Sum("amount"))

        # Prepare data for Chart.js
        labels = []
        data = []

        for entry in category_data:
            category_name = entry["category__name"] if entry["category__name"] else "Uncategorized"
            labels.append(category_name)
            data.append(float(entry["total"]))

        result = JsonResponse({"labels": labels, "data": data})
        print("hi, this is result", result)  # ✅ Debugging output to terminal
        return result

class CategoryPieGraphIncoming(APIView):
    permission_classes = [IsAuthenticated]  # ✅ Ensures only authenticated users can access

    def get(self, request):
        user = request.user
        print(f"User: {user}")

        # Get only outgoing categories
        outgoing_categories = Category.objects.filter(outgoing=False).values_list("name", flat=True)

        # Get transactions for outgoing categories
        transactions = Transaction.objects.filter(author=user, category__name__in=outgoing_categories)

        # Aggregate transaction amounts by category
        category_data = transactions.values("category__name").annotate(total=Sum("amount"))

        # Prepare data for Chart.js
        labels = []
        data = []

        for entry in category_data:
            category_name = entry["category__name"] if entry["category__name"] else "Uncategorized"
            labels.append(category_name)
            data.append(float(entry["total"]))

        result = JsonResponse({"labels": labels, "data": data})
        print("hi, this is result", result)  # ✅ Debugging output to terminal
        return result


def category_list(request):

    permission_classes = [IsAuthenticated]

    categories = list(Category.objects.values("id", "name", "outgoing"))
    return JsonResponse(categories, safe=False)

class TransactionTotal(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        print(user)
        total = Transaction.objects.filter(author=user).aggregate(total_amount=Sum('amount'))
        total = total if total else 0  # Handle case where no transactions exist
        print(total)
        return JsonResponse({'total': total['total_amount']})

class TransactionExtrema(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Highest gain: maximum among positive amounts
        gain_agg = Transaction.objects.filter(author=user, amount__gt=0).aggregate(max_gain=Max('amount'))
        highest_gain = gain_agg.get('max_gain') or 0

        # Largest expense: among negative amounts, the maximum is the one closest to zero
        expense_agg = Transaction.objects.filter(author=user, amount__lt=0).aggregate(max_expense=Max('amount'))
        largest_expense = expense_agg.get('max_expense') or 0
        largest_expense = str(round(largest_expense, 2))

        return JsonResponse({
            'highest_gain': highest_gain,
            'largest_expense': largest_expense
        })

class TransactionListCreate(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(author=user)
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CategoryListCreate(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects

class CategoryDelete(generics.DestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects


class TransactionUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class TransactionDelete(generics.DestroyAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(author=user)

'''
class TransactionFilter(APIView):
    print("Hi")
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        print(request)
        locationFilter = request.query_params.get('locationFilter', None)
        print(locationFilter, "hi")
        minPrice = request.query_params.get('min_price', None)
        print(minPrice)
        maxPrice = request.query_params.get('max_price', None)
        print(maxPrice)

        queryset = Transaction.objects.filter(author=user)

        if locationFilter:
            queryset = queryset.filter(location__icontains=locationFilter)
        if minPrice:
            queryset = queryset.filter(amount__gte=minPrice)
        if maxPrice:
            queryset = queryset.filter(amount__lte=maxPrice)

        serializer = TransactionSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)'''

class TransactionFilter(View):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Parse JSON request body
            data = json.loads(request.body)
            print("Received filters:", data)  # Debugging

            # Extract filters
            location_filter = data.get("locationFilter", None)
            min_price = data.get("minPrice", None)
            max_price = data.get("maxPrice", None)

            # Example response (Replace with actual DB query)
            return JsonResponse({
                "message": "Filters received successfully!",
                "filters": {
                    "locationFilter": location_filter,
                    "minPrice": min_price,
                    "maxPrice": max_price
                },
                "data": []  # Return filtered transactions here
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@method_decorator(csrf_exempt, name="dispatch")  # 🛠️ Exempt CSRF for API request
def filter(filters):
    name = filters['locationFilter']
    min = filters['minPrice']
    max = filters['maxPrice']
    print("Here are the filters: ", name, min, max)


CORS_ALLOW_ALL_ORIGINS = True
