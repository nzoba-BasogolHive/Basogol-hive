from django.conf import settings
from django.core.mail import send_mail, EmailMultiAlternatives
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NewsletterSubscriber
from .serializers import ContactMessageSerializer
from email.mime.image import MIMEImage
import os
from smtplib import SMTPException
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
class ContactMessageCreateView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Les informations envoyées sont invalides.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        contact = serializer.save()
        department = request.data.get("department", "tech")

        language = request.data.get("language", "fr")

        if department == "marketing":
            recipient_email = settings.CONTACT_RECIPIENT_MARKETING
            service_label = "Marketing & Brand"
        else:
            recipient_email = settings.CONTACT_RECIPIENT_TECH
            service_label = "Technologie" if language == "fr" else "Technology"

        full_name = f"{contact.first_name} {contact.last_name}".strip()

        email_subject = f"Nouveau message de contact - {full_name}"
        email_message = (
            f"Vous avez reçu un nouveau message depuis le site Basogol.\n\n"
            f"Service : {service_label}\n"
            f"Nom : {full_name}\n"
            f"Email : {contact.email}\n"
            f"Sujet : {contact.subject}\n"
            f"Message :\n{contact.message}\n"
        )

        try:
            validate_email(contact.email)

            send_mail(
                email_subject,
                email_message,
                settings.DEFAULT_FROM_EMAIL,
                [recipient_email],
                fail_silently=False,
            )
            language = request.data.get("language", "fr")

            confirmation_subject = (
                "Nous avons bien reçu votre message"
                if language == "fr"
                else "We have received your message"
            )

            confirmation_message = (
                f"Bonjour {full_name},\n\n"
                f"Votre message a bien été envoyé à Basogol-Hive.\n"
                f"Sujet : {contact.subject}\n"
                f"Service : {service_label}\n\n"
                f"Notre équipe vous répondra dans les plus brefs délais.\n\n"
                f"Basogol-Hive"
                if language == "fr"
                else
                f"Hello {full_name},\n\n"
                f"Your message has been successfully sent to Basogol-Hive.\n"
                f"Subject: {contact.subject}\n"
                f"Service: {service_label}\n\n"
                f"Our team will get back to you as soon as possible.\n\n"
                f"Basogol-Hive"
            )

            confirmation_html = f"""
            <div style="margin:0; padding:0; background-color:#f4f7fb;">
            <div style="max-width:640px; margin:0 auto; padding:40px 20px;">
                <div style="
                background:linear-gradient(135deg,#1a5f7a 0%,#1f739b 45%,#1a6688 100%);
                border-radius:20px 20px 0 0;
                padding:32px 28px;
                text-align:center;
                color:#ffffff;
                ">
                <h1 style="margin:0; font-size:28px; line-height:1.3; font-weight:700;">
                    {"Nous avons bien reçu votre message" if language == "fr" else "We have received your message"}
                </h1>
                <p style="margin:12px 0 0; font-size:15px; line-height:1.7; color:rgba(255,255,255,0.88);">
                    {"Merci de nous avoir contactés." if language == "fr" else "Thank you for contacting us."}
                </p>
                </div>

                <div style="
                background:#ffffff;
                border-radius:0 0 20px 20px;
                padding:32px 28px;
                box-shadow:0 12px 40px rgba(15,23,42,0.08);
                ">
                <p style="margin:0 0 16px; font-size:15px; color:#334155; line-height:1.8;">
                    {"Bonjour" if language == "fr" else "Hello"} {full_name},
                </p>

                <p style="margin:0 0 16px; font-size:15px; color:#334155; line-height:1.8;">
                    {"Votre message a bien été envoyé à Basogol-Hive." if language == "fr" else "Your message has been successfully sent to Basogol-Hive."}
                </p>

                <div style="
                    margin:24px 0;
                    padding:18px 20px;
                    background:#f8fbfd;
                    border:1px solid #d8eaf3;
                    border-radius:14px;
                ">
                    <p style="margin:0 0 10px; font-size:14px; color:#0f172a; line-height:1.8;">
                    <strong>{"Sujet" if language == "fr" else "Subject"} :</strong> {contact.subject}
                    </p>
                    <p style="margin:0 0 10px; font-size:14px; color:#0f172a; line-height:1.8;">
                    <strong>{"Service" if language == "fr" else "Service"} :</strong> {service_label}
                    </p>
                    <p style="margin:0; font-size:14px; color:#0f172a; line-height:1.8;">
                    <strong>{"Message" if language == "fr" else "Message"} :</strong><br>
                    {contact.message}
                    </p>
                </div>

                <p style="margin:0 0 6px; font-size:15px; color:#334155; line-height:1.8;">
                    {"Notre équipe vous répondra dans les plus brefs délais." if language == "fr" else "Our team will get back to you as soon as possible."}
                </p>

                <p style="margin:0; font-size:15px; color:#0f172a; font-weight:700;">
                    {"L'équipe Basogol-Hive" if language == "fr" else "The Basogol-Hive team"}
                </p>

                <div style="margin-top:16px; text-align:center;">
                    <img
                    src="https://basogolhive.com/bas.jpg"
                    alt="Basogol-Hive"
                    style="display:inline-block; width:100%; max-width:420px; height:auto; border-radius:12px;"
                    >
                </div>

                <div style="
                    margin-top:28px;
                    padding-top:18px;
                    border-top:1px solid #e2e8f0;
                    font-size:13px;
                    color:#64748b;
                    line-height:1.7;
                ">
                    projects-global@basogolhive.com
                </div>
                </div>
            </div>
            </div>
            """

            confirmation_email = EmailMultiAlternatives(
                subject=confirmation_subject,
                body=confirmation_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[contact.email],
            )
            confirmation_email.attach_alternative(confirmation_html, "text/html")

            image_path = os.path.join(settings.BASE_DIR, "public", "bas.jpg")

            with open(image_path, "rb") as img_file:
                img = MIMEImage(img_file.read())
                img.add_header("Content-ID", "<basogol_contact_banner>")
                img.add_header("Content-Disposition", "inline", filename="bas.jpg")
                confirmation_email.attach(img)

            confirmation_email.send()
            return Response(
                {
                    "success": True,
                    "message": "Votre message a bien été envoyé."
                },
                status=status.HTTP_201_CREATED,
            )

        except ValidationError:
            return Response(
                {
                    "success": False,
                    "message": "L’adresse email saisie est invalide."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        except SMTPException:
            return Response(
                {
                    "success": False,
                    "message": "Une erreur est survenue lors de l’envoi de l’email. Veuillez réessayer plus tard."
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        except Exception:
            return Response(
                {
                    "success": False,
                    "message": "Une erreur inattendue est survenue. Veuillez réessayer."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        

class NewsletterSubscribeView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        email = request.data.get("email", "").strip().lower()
        language = request.data.get("language", "fr")

        if not email:
            return Response(
                {
                    "success": False,
                    "message": (
                        "Email requis."
                        if language == "fr"
                        else "Email is required."
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {
                    "success": False,
                    "message": (
                        "L’adresse email saisie est invalide."
                        if language == "fr"
                        else "The email address is invalid."
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        subscriber, created = NewsletterSubscriber.objects.get_or_create(
            email=email,
            defaults={"language": language},
        )

        if not created and subscriber.is_active:
            return Response(
                {
                    "success": True,
                    "message": (
                        "Vous êtes déjà abonné à la newsletter."
                        if language == "fr"
                        else "You are already subscribed to the newsletter."
                    ),
                    "created": False,
                    "already_subscribed": True,
                },
                status=status.HTTP_200_OK,
            )

        if not created and not subscriber.is_active:
            subscriber.is_active = True
            subscriber.language = language
            subscriber.save()

        subject = (
            "Bienvenue dans la newsletter Basogol-Hive"
            if language == "fr"
            else "Welcome to the Basogol-Hive newsletter"
        )

        text_content = (
            "Bonjour,\n\n"
            "Merci pour votre inscription à la newsletter de Basogol-Hive.\n"
            "Vous recevrez désormais nos actualités, contenus et nouveautés.\n\n"
            "À très bientôt,\n"
            "L'équipe Basogol-Hive"
            if language == "fr"
            else
            "Hello,\n\n"
            "Thank you for subscribing to the Basogol-Hive newsletter.\n"
            "You will now receive our news, updates and latest content.\n\n"
            "See you soon,\n"
            "The Basogol-Hive team"
        )

        html_content = f"""
        <div style="margin:0; padding:0; background-color:#f4f7fb;">
          <div style="max-width:640px; margin:0 auto; padding:40px 20px;">
            <div style="
              background:linear-gradient(135deg,#1a5f7a 0%,#1f739b 45%,#1a6688 100%);
              border-radius:20px 20px 0 0;
              padding:32px 28px;
              text-align:center;
              color:#ffffff;
            ">
              <h1 style="margin:0; font-size:28px; line-height:1.3; font-weight:700;">
                {"Bienvenue chez Basogol-Hive" if language == "fr" else "Welcome to Basogol-Hive"}
              </h1>
              <p style="margin:12px 0 0; font-size:15px; line-height:1.7; color:rgba(255,255,255,0.88);">
                {"Merci pour votre inscription à notre newsletter." if language == "fr" else "Thank you for subscribing to our newsletter."}
              </p>
            </div>

            <div style="
              background:#ffffff;
              border-radius:0 0 20px 20px;
              padding:32px 28px;
              box-shadow:0 12px 40px rgba(15,23,42,0.08);
            ">
              <p style="margin:0 0 16px; font-size:15px; color:#334155; line-height:1.8;">
                {"Bonjour," if language == "fr" else "Hello,"}
              </p>

              <p style="margin:0 0 16px; font-size:15px; color:#334155; line-height:1.8;">
                {"Merci pour votre inscription à la newsletter de" if language == "fr" else "Thank you for subscribing to the"}
                <strong> Basogol-Hive</strong>.
              </p>

              <p style="margin:0 0 16px; font-size:15px; color:#334155; line-height:1.8;">
                {"Vous recevrez désormais nos actualités, contenus, conseils et nouveautés." if language == "fr" else "You will now receive our news, content, insights and updates."}
              </p>

              <div style="
                margin:24px 0;
                padding:18px 20px;
                background:#f8fbfd;
                border:1px solid #d8eaf3;
                border-radius:14px;
              ">
                <p style="margin:0; font-size:14px; color:#1f6c8c; line-height:1.8;">
                  {"Nous sommes ravis de vous compter parmi notre communauté." if language == "fr" else "We are delighted to welcome you to our community."}
                </p>
              </div>

              <p style="margin:0 0 6px; font-size:15px; color:#334155; line-height:1.8;">
                {"À très bientôt," if language == "fr" else "See you soon,"}
              </p>
              <p style="margin:0; font-size:15px; color:#0f172a; font-weight:700;">
                {"L'équipe Basogol-Hive" if language == "fr" else "The Basogol-Hive team"}
              </p>

              <div style="margin-top:16px; text-align:center;">
                <img
                 src="https://basogolhive.com/bas.jpg"
                  alt="Basogol-Hive"
                  style="display:inline-block; width:100%; max-width:420px; height:auto; border-radius:12px;"
                >
              </div>

              <div style="
                margin-top:28px;
                padding-top:18px;
                border-top:1px solid #e2e8f0;
                font-size:13px;
                color:#64748b;
                line-height:1.7;
              ">
               projects-global@basogolhive.com
              </div>
            </div>
          </div>
        </div>
        """

        try:
            email_message = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email],
            )
            email_message.attach_alternative(html_content, "text/html")
            email_message.send()
            internal_subject = (
                "Nouvel abonnement à la newsletter Basogol-Hive"
                if language == "fr"
                else "New Basogol-Hive newsletter subscription"
            )

            internal_message = (
                f"Un nouvel utilisateur s'est abonné à la newsletter.\n\n"
                f"Email : {email}\n"
                f"Langue : {language}\n"
                if language == "fr"
                else
                f"A new user has subscribed to the newsletter.\n\n"
                f"Email: {email}\n"
                f"Language: {language}\n"
            )

            send_mail(
                internal_subject,
                internal_message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.NEWSLETTER_NOTIFICATION_EMAIL],
                fail_silently=False,
            )
            return Response(
                {
                    "success": True,
                    "message": (
                        "Merci, votre email a bien été ajouté."
                        if language == "fr"
                        else "Thank you, your email has been added."
                    ),
                    "created": True,
                    "already_subscribed": False,
                },
                status=status.HTTP_201_CREATED,
            )

        except FileNotFoundError:
            return Response(
                {
                    "success": False,
                    "message": (
                        "Une erreur est survenue lors de la préparation de l’email."
                        if language == "fr"
                        else "An error occurred while preparing the email."
                    ),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        except SMTPException:
            return Response(
                {
                    "success": False,
                    "message": (
                        "Une erreur est survenue lors de l’envoi de l’email. Veuillez réessayer plus tard."
                        if language == "fr"
                        else "An email sending error occurred. Please try again later."
                    ),
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        except Exception:
            return Response(
                {
                    "success": False,
                    "message": (
                        "Une erreur inattendue est survenue."
                        if language == "fr"
                        else "An unexpected error occurred."
                    ),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    
#     <img
#   src="https://basogol-hive-git-project-basogolhive-tech.vercel.app/bas.png"
#   alt="Basogol-Hive"
#   style="display:inline-block; width:100%; max-width:420px; height:auto; border-radius:12px;"
# >