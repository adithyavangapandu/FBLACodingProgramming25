from django.urls import path
from . import views

urlpatterns = [
    path("transactions/", views.TransactionListCreate.as_view(), name="transaction-list"),
    path("categories/", views.CategoryListCreate.as_view(), name="category-list"),
    path("transactions/delete/<int:pk>/", views.TransactionDelete.as_view(), name="delete-transaction"),
    path("categories/delete/<int:pk>/", views.CategoryDelete.as_view(), name="delete-category"),
    path("transactions/total/", views.TransactionTotal.as_view(), name="transaction-total"),
    path("transactions/extrema/", views.TransactionExtrema.as_view(), name="transaction-total"),
    path("transactions/<int:pk>/", views.TransactionUpdate.as_view(), name="transaction-update"),
    path("transactions/filter/", views.filter, name="transaction-filter"),
    path("categories/", views.category_list, name="category-list"),
    path("category-pie-graph-outgoing/", views.CategoryPieGraphOutgoing.as_view(), name="category-pie-graph-outgoing"),
    path("category-pie-graph-incoming/", views.CategoryPieGraphIncoming.as_view(), name="category-pie-graph-incoming"),
    path("bar-graph/", views.GetBarGraphData.as_view(), name="bar-graph-data")
]
