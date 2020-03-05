Óra végi feladat:


1. nyissatok egy calculator.js nevű fájlt a routes.js mintájára egy exportált routerrel
2. legyen benne definiálva egy calculate route, amely
 - HTTP GET esetén összeadja az url paraméterből kiolvasott a és b változókat
 - POST esetén a-b
 - PUT esetén a*b
 - DELETE esetén a/b
 - és 200-as status code-dal az eredményt küldje vissza a kliensnek
 - ha a vagy b hiányzik, 400-as hibakód menjen vissza