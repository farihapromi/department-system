from django.db import models
from django.core.exceptions import ValidationError


# Create your models here.
class Department(models.Model):
      name = models.CharField(max_length=200)
      shortcode = models.CharField(max_length=20, unique=True)
      shortcode_bangla = models.CharField(max_length=50, unique=True)

      def __str__(self):
            return self.name
class ExamSystem(models.Model):
    YEAR_CHOICES = (
        ('1st','1st'),
        ('2nd', '2nd'),
        ('3rd', '3rd'),
        ('4th', '4th'),
    )
    department = models.ForeignKey(
        Department, 
        on_delete=models.CASCADE, 
        related_name='department')
    year = models.CharField(max_length=3, choices=YEAR_CHOICES)
    # committee_members = models.ManyToManyField(
    #     Staff,
    #     through='ExamCommittee',
    #     related_name='committee_member'
    # )

    class Meta:
        unique_together = ('department', 'year')

    def __str__(self):
        return self.department.shortcode+' '+self.year+' year'

class Semester(models.Model):
    SEMESTER_CHOICES = (
        ('1st','1st'),
        ('2nd','2nd'),
    )
    exam_system = models.ForeignKey(ExamSystem, on_delete=models.CASCADE)
    semester = models.CharField(max_length=3, choices=SEMESTER_CHOICES)

    class Meta:
        unique_together = ('exam_system', 'semester')

    def __str__(self):
        return self.exam_system.department.shortcode+' '+self.exam_system.year+' year '+ self.semester + ' sem'


class Course(models.Model):
    """

Model representing a course offered in a semester.

Fields:
- semester: ForeignKey to Semester model, represents the semester to which the course belongs.
- course_code: CharField, represents the code of the course.
- course_name: CharField, represents the name of the course.
- chief: ManyToManyField to Staff model, through CourseChief model, represents the chief(s) of the course.

Methods:
- _str_: Returns the course code as string.

Related models:
- Semester: Model representing a semester in an academic year.
- Staff: Model representing a staff member of the university.
- CourseChief: Model representing the relation between Course and Staff models for the chief(s) of a course.


"""
    id = models.AutoField(primary_key=True)
    semester = models.ForeignKey(Semester,on_delete=models.CASCADE, related_name='semester_course')
    course_code = models.CharField(max_length=100, unique=True)
    course_name = models.CharField(max_length=200, unique=True)
    # course_chief = models.ManyToManyField(Staff, through='CourseChief', related_name='course_chief')
    


    def __str__(self):
        return self.course_code

class ExamSchedule(models.Model):
    sem = models.ForeignKey(Semester, on_delete=models.CASCADE)
    date_generation = models.DateField(auto_now_add=True)
    exam_year = models.CharField(max_length=10)  
    # exam_date = models.DateField()
    # # course = models.OneToOneField(Course,on_delete=models.CASCADE, limit_choices_to={'semester': sem})
    # course = models.OneToOneField(Course, on_delete=models.CASCADE)
    # time = models.CharField(max_length=50)
    course_schedule = models.ManyToManyField(Course, through='CourseSchedule')

    class Meta:
        unique_together = ('sem', 'exam_year')

    def __str__(self):
        return 'ExamSchedule'+self.exam_year +' '+self.sem.exam_system.year +' year '+self.sem.semester + ' sem'

class CourseSchedule(models.Model):
    schedule = models.ForeignKey(ExamSchedule, on_delete=models.CASCADE)
    exam_date = models.DateField()
    course_code = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_code_for_schedule')
    # course_name_schedule = models.ForeignKey(Course, to_field='course_name', on_delete=models.CASCADE, related_name='course_name_for_schedule')
    time = models.CharField(max_length=50)

    class Meta:
        unique_together = ('course_code', 'schedule')

    def __str__(self):
        return 'Course Schedule'+ self.schedule.sem.semester+ ' sem'+ self.schedule.sem.exam_system.year+' year'

    def clean(self):
        super().clean()
        if self.course_code.semester != self.schedule.sem:
            raise ValidationError('The course does not belong to the same semester as the exam schedule.')
    










# class Course(models.Model):
#     name=models.CharField(max_length=30)
#     code=models.CharField(max_length=10)
#     date = models.DateField()
#     duration = models.CharField(max_length=100)
# class Employee(models.Model):
#     name=models.CharField(max_length=30)
#     email=models.CharField(max_length=40)
#     contact=models.CharField(max_length=30)
#     address=models.CharField(max_length=10)


