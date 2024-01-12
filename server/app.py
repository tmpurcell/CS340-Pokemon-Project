import os
from api import create_app

app = create_app()
app.app_context().push()

if __name__ == '__main__':
    if os.getenv('RUNNING_IN_PRODUCTION'):
        app.run()
    else:
        app.run(host='0.0.0.0', port=5001, debug=False)
 