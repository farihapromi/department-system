from django.contrib.auth.models import User, Group
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# class CourseSerializer(serializers.ModelSerializer):
#     code = serializers.CharField()
#     name = serializers.CharField()
#     date = serializers.DateField(format="%d/%m/%Y")

#     class Meta:
#         model = Course
#         fields = ('id', 'date', 'code', 'name', 'duration')





# class DepartmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Department
#         fields = '__all__'

# class ExamSystemSerializer(serializers.ModelSerializer):
#     department = DepartmentSerializer()

#     class Meta:
#         model = ExamSystem
#         fields = '__all__'
# """
# documentation

# """
# class SemesterSerializer(serializers.ModelSerializer):
#     exam_system = ExamSystemSerializer()

#     class Meta:
#         model = Semester
#         fields = '__all__'
#         # extra_kwargs = {
#         #     'sem': {'write_only': True},
#         # }

# class CourseSerializer(serializers.ModelSerializer):
#     semester = SemesterSerializer()

#     class Meta:
#         model = Course
#         fields = '__all__'


# class ExamScheduleSerializer(serializers.ModelSerializer):
#     # semester_year = serializers.ReadOnlyField(source='sem.exam_system.year')
#     # semester_semester = serializers.ReadOnlyField(source='sem.semester')
#     # course_code = serializers.ReadOnlyField(source='course.course_code')
#     # course_name = serializers.ReadOnlyField(source='course.course_name')

#     class Meta:
#         model = ExamSchedule
#         # fields = ['id', 'semester_year', 'semester_semester', 'date_generation', 'exam_year', 'exam_date', 'course_code', 'course_name', 'time']
#         fields = '__all__'










class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class DepartmentExamSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = 'shortcode'

class ExamSystemSerializer(serializers.ModelSerializer):
    #department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())

    class Meta:
        model = ExamSystem
        fields = '__all__'

    def validate(self, data):
        """
        Check that the data contains all required fields and has expected values.
        """
        if 'department' not in data:
            raise serializers.ValidationError("Department field is required.")
        if 'year' not in data:
            raise serializers.ValidationError("Year field is required.")
        if data['year'] not in dict(ExamSystem.YEAR_CHOICES):
            raise serializers.ValidationError("Invalid value for year field.")
        return data

class SemesterSerializer(serializers.ModelSerializer):
    #exam_system = ExamSystemSerializer()

    class Meta:
        model = Semester
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    #semester = SemesterSerializer()

    class Meta:
        model = Course
        fields = '__all__'

class ExamScheduleSerializer(serializers.ModelSerializer):
    #course_schedule= CourseSerializer()

    class Meta:
        model = ExamSchedule
        fields = '__all__'


# class CourseScheduleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CourseSchedule
#         # fields = ['id', 'course_code_schedule', 'course_name_schedule', 'schedule', 'exam_date', 'time']
#         fields = '__all__'


class CourseScheduleSerializer(serializers.ModelSerializer):
    #course_code = CourseSerializer()

    class Meta:
        model = CourseSchedule
        fields = '__all__'