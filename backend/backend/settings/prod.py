from .common import *


# DEBUG = False
DEBUG = os.environ.get('DEBUG') in ['1', 't', 'true', 'T', 'True']
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", '').split(",")

STATICFILES_STORAGE = "backend.storages.StaticAzureStorage"   # static
DEFAULT_FILE_STORAGE = "backend.storages.MediaAzureStorage"  # media

AZURE_ACCOUNT_NAME = os.environ["AZURE_ACCOUNT_NAME"]
AZURE_ACCOUNT_KEY = os.environ["AZURE_ACCOUNT_KEY"]

CORS_ORIGIN_WHITELIST = os.environ.get("CORS_ORIGIN_WHITELIST", '').split(",")

#TODO: DATABASE
DATABASES = {
    'default': {
        'ENGINE': os.environ.get('DB_ENGINE', 'django.db.backends.postgresql'),
        'HOST': os.environ.get('DB_HOST'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'NAME': os.environ.get('DB_NAME', 'postgres'),
    },
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'ERROR',
        },
    },
}
