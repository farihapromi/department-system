from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(Course)
admin.site.register(Department)
admin.site.register(ExamSchedule)
admin.site.register(ExamSystem)
admin.site.register(Semester)
admin.site.register(CourseSchedule)

