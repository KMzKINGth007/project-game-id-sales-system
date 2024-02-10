** env_guide **

PORT=

JWT_KEY=

----------

** api_service **

method           path              params        body

PORT           /auth/register      none          {username, password, confirmPassword, email}
PORT           /auth/login         none          {username, password}


----------

Notes

MVC (Models, route+Controller, View)