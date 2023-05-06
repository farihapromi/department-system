

from .views import *


from django.urls import path,include
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView
# )


# path('course/', views.CourseList.as_view()),
# path('employee/', views.EmployeeList.as_view()),
# # path('schedules/', ScheduleList.as_view()),


urlpatterns = [
    path('courses/', CourseAPIView.as_view()),
    path('departments/', DepartmentListView.as_view()),
    path('examsystems/', ExamSystemListView.as_view()),
    path('semesters/', SemesterListView.as_view()),
    path('examschedule/', ExamScheduleCreateView.as_view()),
    path('courseschedule/', CourseScheduleListCreateView.as_view()),
]
    
    

