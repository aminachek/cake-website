// ==========================
// INITIALISATION
// ==========================

const canvas = document.getElementById("cakeCanvas");
const ctx = canvas.getContext("2d");

let cakeColor = "#d8a46d";
let creamColor = "#fff3ea";

let decorations = [];
let selected = null;

// ==========================
// CHANGEMENT DES COULEURS
// ==========================

document.getElementById("cakeColor").addEventListener("input", function (e) {
    cakeColor = e.target.value;
    drawCake();
});

document.getElementById("creamColor").addEventListener("input", function (e) {
    creamColor = e.target.value;
    drawCake();
});

// ==========================
// DESSIN DU GÂTEAU
// ==========================

function drawCake() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fond
    ctx.fillStyle = "#fffaf7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Assiette
    ctx.fillStyle = "#dddddd";

    ctx.beginPath();
    ctx.ellipse(450, 560, 180, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Base
    ctx.fillStyle = cakeColor;
    roundRect(300, 340, 300, 170, 20);

    // Crème bas
    ctx.fillStyle = creamColor;
    roundRect(300, 315, 300, 35, 20);

    // Deuxième étage
    ctx.fillStyle = cakeColor;
    roundRect(355, 180, 190, 120, 20);

    // Crème haut
    ctx.fillStyle = creamColor;
    roundRect(355, 160, 190, 30, 20);

    // Yeux
    ctx.fillStyle = "#222";

    ctx.beginPath();
    ctx.arc(410, 245, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(490, 245, 8, 0, Math.PI * 2);
    ctx.fill();

    // Reflets
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(407, 242, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(487, 242, 2, 0, Math.PI * 2);
    ctx.fill();

    // Joues
    ctx.fillStyle = "#ffb6c1";

    ctx.beginPath();
    ctx.arc(385, 265, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(515, 265, 8, 0, Math.PI * 2);
    ctx.fill();

    // Sourire
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(450, 275, 15, 0, Math.PI);
    ctx.stroke();

    // Dessiner toutes les décorations
    decorations.forEach(function (d) {

        if (d.type === "strawberry") {
            drawStrawberry(d);
        }

        if (d.type === "cherry") {
            drawCherry(d);
        }

        if (d.type === "macaron") {
            drawMacaron(d);
        }

        if (d.type === "heart") {
            drawHeart(d);
        }

    });

}

// ==========================
// RECTANGLE ARRONDI
// ==========================

function roundRect(x, y, w, h, r) {

    ctx.beginPath();

    ctx.moveTo(x + r, y);

    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);

    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);

    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);

    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);

    ctx.closePath();
    ctx.fill();
}
    // ==========================
// DESSIN DES DECORATIONS
// ==========================

// Fraise
function drawStrawberry(s) {

    // Corps
    ctx.fillStyle = "red";

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Feuilles
    ctx.fillStyle = "green";

    ctx.beginPath();
    ctx.moveTo(s.x, s.y - s.size / 2);
    ctx.lineTo(s.x - 8, s.y - s.size / 2 + 10);
    ctx.lineTo(s.x + 8, s.y - s.size / 2 + 10);
    ctx.closePath();
    ctx.fill();

    // Graines
    ctx.fillStyle = "yellow";

    for (let i = 0; i < 8; i++) {

        const angle = (Math.PI * 2 / 8) * i;

        const px = s.x + Math.cos(angle) * 8;
        const py = s.y + Math.sin(angle) * 8;

        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();

    }

}

// Cerise
function drawCherry(c) {

    // Tige
    ctx.strokeStyle = "#3a5a40";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(c.x, c.y - c.size / 2);
    ctx.lineTo(c.x + 8, c.y - 25);
    ctx.stroke();

    // Fruit
    ctx.fillStyle = "#d90429";

    ctx.beginPath();
    ctx.arc(c.x, c.y, c.size / 2, 0, Math.PI * 2);
    ctx.fill();

}

// Macaron
function drawMacaron(m) {

    ctx.fillStyle = "#ffb6c1";

    roundRect(
        m.x - 20,
        m.y - 10,
        40,
        20,
        10
    );

    // Crème
    ctx.fillStyle = "#fff";

    ctx.fillRect(
        m.x - 18,
        m.y - 2,
        36,
        4
    );

}

// Cœur
function drawHeart(h) {

    ctx.save();

    ctx.translate(h.x, h.y);

    ctx.scale(h.size / 25, h.size / 25);

    ctx.fillStyle = "hotpink";

    ctx.beginPath();

    ctx.moveTo(0, 8);

    ctx.bezierCurveTo(-12, -8, -25, 5, 0, 25);

    ctx.bezierCurveTo(25, 5, 12, -8, 0, 8);

    ctx.fill();

    ctx.restore();

}

// ==========================
// BOUTONS
// ==========================

// Fraise
document.getElementById("addStrawberry").onclick = function () {

    decorations.push({
        type: "strawberry",
        x: 450,
        y: 120,
        size: 35
    });

    drawCake();

};

// Cerise
document.getElementById("addCherry").onclick = function () {

    decorations.push({
        type: "cherry",
        x: 420,
        y: 120,
        size: 25
    });

    drawCake();

};

// Macaron
document.getElementById("addMacaron").onclick = function () {

    decorations.push({
        type: "macaron",
        x: 480,
        y: 120,
        size: 40
    });

    drawCake();

};

// Cœur
document.getElementById("addHeart").onclick = function () {

    decorations.push({
        type: "heart",
        x: 450,
        y: 90,
        size: 25
    });

    drawCake();

};

// Effacer
document.getElementById("clearCanvas").onclick = function () {

    decorations = [];

    drawCake();

};
// ==========================
// GLISSER - DÉPOSER
// ==========================

// Sélection d'une décoration
canvas.addEventListener("mousedown", function (e) {

    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    selected = null;

    // On parcourt les décorations de la dernière vers la première
    for (let i = decorations.length - 1; i >= 0; i--) {

        const d = decorations[i];

        const dx = mx - d.x;
        const dy = my - d.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < d.size / 2 + 10) {

            selected = d;
            break;

        }

    }

});

// Déplacement
canvas.addEventListener("mousemove", function (e) {

    if (selected) {

        const rect = canvas.getBoundingClientRect();

        selected.x = e.clientX - rect.left;
        selected.y = e.clientY - rect.top;

        drawCake();

    }

});

// Relâcher la décoration
canvas.addEventListener("mouseup", function () {

    selected = null;

});

// Si la souris quitte le canvas
canvas.addEventListener("mouseleave", function () {

    selected = null;

});

// ==========================
// DESSIN INITIAL
// ==========================

drawCake();