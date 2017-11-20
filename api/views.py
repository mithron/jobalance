import os, logging

from rest_framework import generics
from rest_framework.permissions import AllowAny

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

from .models import SimpleCV
from .serializers import SimpleCVSerializer

# Create your views here.
logger = logging.getLogger("")

class ListCVs(generics.ListAPIView):
    queryset = SimpleCV.objects.all()
    serializer_class = SimpleCVSerializer
    permission_classes = (AllowAny,)

class CVbyRegionText(generics.ListAPIView):
    serializer_class = SimpleCVSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases by filtering against query parameter in the URL.
        """
        queryset = SimpleCV.objects.all()
        #logger.debug(self.request.query_params.values())
       # text = self.request.query_params.get('text', None)
      #    regionId = self.request.query_params.get('regionId', None)
        
        text = self.kwargs.get('text', None)
        regionId = self.kwargs.get('regionId', None)
        logger.debug(text)
        logger.debug(type(text))
        logger.debug(regionId)
        
        if text and text != '-':
            queryset = queryset.filter(jobTitle__icontains=text)
        if regionId:
            queryset = queryset.filter(regionId=regionId)
        return queryset



class FrontendAppView(View):
    """
    Serves the compiled frontend entry point 
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except Exception as exc:
            logging.exception('Error occured: %s' % repr(exc))
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )