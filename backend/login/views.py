from rest_framework import generics, status
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def post(self, request, *args, **kwargs):
    
        data = request.data
        print(f"Adding new profile for: {data.get('username')}")

       
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
           
            return Response(
                {"message": "Profile created successfully!", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        
       
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)