from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer

# REGISTER (CREATE)
class RegisterAPI(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=400)


# LOGIN
class LoginAPI(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data.get('username'),
            password=request.data.get('password')
        )


        if user:
            return Response({"Success":True,"message": "Login success","User_id":user.id})
        return Response({"success": False,"error": "Invalid credentials"}, status=401)
