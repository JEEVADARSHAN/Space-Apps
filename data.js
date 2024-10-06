export const planetData = [
    { name: "Mercury", semiMajorAxis: 2, eccentricity: 0.206, radius: 0.38/5, speed: 4.74/10, texture: "./textures/mercury.jpg",
    info: "It’s the nearest planet to the sun and is also the smallest planet in the solar system and takes around 88 days to complete one revolution (to be exact 88.97 days) which is the smallest time duration.",},
    { name: "Venus", semiMajorAxis: 3, eccentricity: 0.007, radius: 0.95/5, speed: 3.50/10, texture: "./textures/venus.jpg",
    info: "The second planet from the sun, and the brightest planet in the night sky. It spins in the opposite direction to all the other planets, and has no moons", },
    { name: "Earth", semiMajorAxis: 4.00, eccentricity: 0.017, radius: 1.00/5, speed: 2.98/10, texture: "./textures/earth.jpg",
    info: "Earth is the third planet from the Sun and the only astronomical object known to harbor life.", },
    { name: "Mars", semiMajorAxis: 5.52, eccentricity: 0.094, radius: 0.53/5, speed: 2.41/10, texture: "./textures/mars.jpg",
    info: "The fourth planet from the sun, and is known as the red planet because of its red color. It has two satellites.", },
    { name: "Jupiter", semiMajorAxis: 7.20, eccentricity: 0.049, radius: 10.9/20, speed: 1.31/10, texture: "./textures/jupiter.jpg",
    info: "The largest planet in the solar system, and is made up of gases like helium and hydrogen.", },
    { name: "Saturn", semiMajorAxis: 8.58, eccentricity: 0.052, radius: 9.13/20, speed: 0.97/10, texture: "./textures/saturn.jpg",
    info: "The second largest planet in the solar system, and is made up entirely of gases. It has a ring around it.", },
    { name: "Uranus", semiMajorAxis: 9.22, eccentricity: 0.047, radius: 3.98/20, speed: 0.68/10, texture: "./textures/uranus.jpg",
    info: "It is the eighth planet from the Sun. It is the fourth-largest planet by diameter. The third most massive planet and is the densest giant planet - it is slightly larger than Uranus and Neptune. It orbits the Sun every 164.8 years and denser than Uranus and physically smaller than Uranus.", },
    { name: "Neptune", semiMajorAxis: 11.05, eccentricity: 0.010, radius: 3.86/20, speed: 0.54/10, texture: "./textures/neptune.jpg",
    info: "The eighth planet from the sun, and is on average the coldest planet in the solar system. It is more than 30 times as far from the sun as Earth.", },
];
export const constellations = [
    {
        name: "Orion",
        stars: [
            { position: { x: 650.0, y: 100.0, z: -50.0 } }, // Betelgeuse (~642 light-years)
            { position: { x: 800.0, y: 50.0, z: -40.0 } }, // Rigel (~860 light-years)
            { position: { x: 620.0, y: 80.0, z: -30.0 } }, // Bellatrix (~240 light-years)
            { position: { x: 700.0, y: 10.0, z: -70.0 } }, // Saiph (~720 light-years)
            { position: { x: 600.0, y: 60.0, z: -20.0 } }, // Alnitak (~800 light-years)
            { position: { x: 580.0, y: 40.0, z: -25.0 } }, // Alnilam (~1340 light-years)
            { position: { x: 610.0, y: 20.0, z: -55.0 } }  // Mintaka (~900 light-years)
        ]
    },
    {
        name: "Ursa Major",
        stars: [
            { position: { x: -80.0, y: 50.0, z: -20.0 } }, // Dubhe (~124 light-years)
            { position: { x: -78.0, y: 45.0, z: -15.0 } }, // Merak (~79 light-years)
            { position: { x: -76.0, y: 48.0, z: -25.0 } }, // Phecda (~84 light-years)
            { position: { x: -74.0, y: 55.0, z: -30.0 } }, // Megrez (~80 light-years)
            { position: { x: -72.0, y: 60.0, z: -35.0 } }, // Furud (~50 light-years)
            { position: { x: -70.0, y: 65.0, z: -40.0 } }, // Alioth (~81 light-years)
            { position: { x: -68.0, y: 70.0, z: -30.0 } }, // Mizar (~78 light-years)
            { position: { x: -66.0, y: 75.0, z: -35.0 } }  // Alkaid (~101 light-years)
        ]
    },
    {
        name: "Cassiopeia",
        stars: [
            { position: { x: 300.0, y: 120.0, z: 180.0 } }, // Schedar (~230 light-years)
            { position: { x: 290.0, y: 115.0, z: 185.0 } }, // Caph (~55 light-years)
            { position: { x: 280.0, y: 110.0, z: 175.0 } }, // Tsih (~220 light-years)
            { position: { x: 270.0, y: 125.0, z: 190.0 } }, // Ruchbah (~100 light-years)
            { position: { x: 260.0, y: 110.0, z: 170.0 } }  // La Superba (~200 light-years)
        ]
    },
    {
        name: "Scorpius",
        stars: [
            { position: { x: -100.0, y: -50.0, z: 30.0 } }, // Antares (~600 light-years)
            { position: { x: -110.0, y: -55.0, z: 25.0 } }, // Shaula (~700 light-years)
            { position: { x: -95.0, y: -48.0, z: 32.0 } }, // Lesath (~600 light-years)
            { position: { x: -90.0, y: -45.0, z: 35.0 } }, // Jabbah (~100 light-years)
            { position: { x: -85.0, y: -40.0, z: 40.0 } }  // Kaus Australis (~150 light-years)
        ]
    },
    {
        name: "Lyra",
        stars: [
            { position: { x: 200.0, y: 90.0, z: 140.0 } }, // Vega (~25 light-years)
            { position: { x: 210.0, y: 85.0, z: 135.0 } }, // Sheliak (~235 light-years)
            { position: { x: 205.0, y: 80.0, z: 130.0 } }, // Sulafat (~90 light-years)
            { position: { x: 195.0, y: 83.0, z: 145.0 } }  // Ault (~500 light-years)
        ]
    },
    {
        name: "Taurus",
        stars: [
            { position: { x: -50.0, y: 45.0, z: 120.0 } }, // Aldebaran (~65 light-years)
            { position: { x: -52.0, y: 40.0, z: 125.0 } }, // Elnath (~130 light-years)
            { position: { x: -48.0, y: 42.0, z: 118.0 } }, // Hyades (~150 light-years)
            { position: { x: -46.0, y: 38.0, z: 122.0 } }  // Pleiades (~444 light-years)
        ]
    },
    {
        name: "Andromeda",
        stars: [
            { position: { x: 600.0, y: 50.0, z: 200.0 } }, // Alpheratz (~97 light-years)
            { position: { x: 610.0, y: 48.0, z: 205.0 } }, // Mirach (~197 light-years)
            { position: { x: 590.0, y: 45.0, z: 195.0 } }  // Almas (~200 light-years)
        ]
    },
    {
        name: "Cygnus",
        stars: [
            { position: { x: -200.0, y: 70.0, z: 80.0 } }, // Deneb (~1,500 light-years)
            { position: { x: -210.0, y: 68.0, z: 85.0 } }, // Sadr (~1,500 light-years)
            { position: { x: -205.0, y: 65.0, z: 82.0 } }  // Botein (~180 light-years)
        ]
    },
    {
        name: "Gemini",
        stars: [
            { position: { x: 80.0, y: 20.0, z: 60.0 } }, // Castor (~51 light-years)
            { position: { x: 82.0, y: 22.0, z: 65.0 } }  // Pollux (~34 light-years)
        ]
    },
    {
        name: "Leo",
        stars: [
            { position: { x: -70.0, y: 60.0, z: 90.0 } }, // Regulus (~77 light-years)
            { position: { x: -72.0, y: 58.0, z: 92.0 } }  // Denebola (~36 light-years)
        ]
    },
    {
        name: "Virgo",
        stars: [
            { position: { x: 50.0, y: -80.0, z: 100.0 } }, // Spica (~250 light-years)
            { position: { x: 52.0, y: -82.0, z: 105.0 } }  // Porrima (~38 light-years)
        ]
    },
    {
        name: "Aquila",
        stars: [
            { position: { x: -100.0, y: 10.0, z: 200.0 } }, // Altair (~16 light-years)
            { position: { x: -105.0, y: 12.0, z: 205.0 } }, // Alshain (~53 light-years)
            { position: { x: -95.0, y: 8.0, z: 198.0 } }    // Tarazed (~400 light-years)
        ]
    },
    {
        name: "Capricornus",
        stars: [
            { position: { x: 100.0, y: -40.0, z: 100.0 } }, // Deneb Algedi (~39 light-years)
            { position: { x: 105.0, y: -42.0, z: 102.0 } }, // Nashira (~139 light-years)
            { position: { x: 98.0, y: -38.0, z: 97.0 } }     // Algedi (~64 light-years)
        ]
    },
    {
        name: "Pleiades",
        stars: [
            { position: { x: 50.0, y: 25.0, z: 60.0 } }, // Alcyone (~450 light-years)
            { position: { x: 52.0, y: 22.0, z: 62.0 } }, // Atlas (~270 light-years)
            { position: { x: 51.0, y: 23.0, z: 59.0 } }  // Pleione (~400 light-years)
        ]
    },
    {
        name: "Cassiopeia",
        stars: [
            { position: { x: 350.0, y: 130.0, z: 200.0 } }, // Schedar (~230 light-years)
            { position: { x: 360.0, y: 125.0, z: 190.0 } }, // Caph (~55 light-years)
            { position: { x: 355.0, y: 120.0, z: 185.0 } }  // Ruchbah (~100 light-years)
        ]
    },
    {
        name: "Pisces",
        stars: [
            { position: { x: -20.0, y: 70.0, z: 200.0 } }, // Alrescha (~139 light-years)
            { position: { x: -25.0, y: 75.0, z: 205.0 } }, // Fumalsamakah (~160 light-years)
            { position: { x: -15.0, y: 72.0, z: 198.0 } }  // Biham (~300 light-years)
        ]
    },
    {
        name: "Hercules",
        stars: [
            { position: { x: 120.0, y: 90.0, z: 220.0 } }, // Vega (~25 light-years)
            { position: { x: 122.0, y: 85.0, z: 215.0 } }, // Zeta Herculis (~46 light-years)
            { position: { x: 118.0, y: 95.0, z: 225.0 } }  // Epsilon Herculis (~250 light-years)
        ]
    }
];