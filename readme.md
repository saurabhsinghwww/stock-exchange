# Stock Exchange

- Created two users for testing (mygration.py)
  1. 'test1@gmail.com', 'password'
  2. 'test2@gmail.com', 'password'
- Configured only one stock now (GOOG), but easily add more by adding in the table
- Attached Snapshot as reference for the UI
- Main logic present in the views.py.

## How to setup

- Create a virtual env for this project
  pip install virtualenv
  virtualenv exchange
  exchange\Scripts\activate.bat
- pip install -r requirements.txt
- cd stock_exchange/frontend
- npm install
- npm run start
- manage.py migrate
- manage.py runserver

