from v1.models import Feedback

def create_feedback_uid(uid, feedback):
    fb = Feedback(uid=uid, feedback=feedback)
    fb.save()
    return

def create_feedback_email(email, name, feedback):
    fb = Feedback(email=email, name=name, feedback=feedback)
    fb.save()
    return