const plants = [
  {
    category: "Air Purifying",
    plants: [
      {
        id: "p1",
        name: "Snake Plant",
        scientificName: "Sansevieria trifasciata",
        image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf7?auto=format&fit=crop&q=80&w=800",
        description: "Known for its ability to filter indoor air, even at night.",
        care: "Low light, water every 2-3 weeks.",
        cost: 25,
        rating: 4.8,
        stock: 15,
        height: "2-3 ft"
      },
      {
        id: "p2",
        name: "Spider Plant",
        scientificName: "Chlorophytum comosum",
        image: "https://images.unsplash.com/photo-1545239351-1141bc82e8a6?auto=format&fit=crop&q=80&w=800",
        description: "Easy to grow and excellent at removing toxins.",
        care: "Bright indirect light, water when top inch is dry.",
        cost: 18,
        rating: 4.5,
        stock: 20,
        height: "1-2 ft"
      },
      {
        id: "p3",
        name: "Peace Lily",
        scientificName: "Spathiphyllum",
        image: "https://images.unsplash.com/photo-1599598424968-37571f301389?auto=format&fit=crop&q=80&w=800",
        description: "Elegant white blooms that filter the air.",
        care: "Shade to partial shade, keep soil moist.",
        cost: 30,
        rating: 4.7,
        stock: 10,
        height: "1.5-2 ft"
      }
    ]
  },
  {
    category: "Aromatic",
    plants: [
      {
        id: "p4",
        name: "Lavender",
        scientificName: "Lavandula",
        image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&q=80&w=800",
        description: "Calming scent and beautiful purple flowers.",
        care: "Full sun, well-draining soil.",
        cost: 22,
        rating: 4.9,
        stock: 12,
        height: "1-1.5 ft"
      },
      {
        id: "p5",
        name: "Rosemary",
        scientificName: "Salvia rosmarinus",
        image: "https://images.unsplash.com/photo-1515582306346-64157583626e?auto=format&fit=crop&q=80&w=800",
        description: "Fragrant herb that adds flavor to your cooking.",
        care: "Full sun, infrequent watering.",
        cost: 15,
        rating: 4.6,
        stock: 25,
        height: "2-3 ft"
      }
    ]
  },
  {
    category: "Medicinal",
    plants: [
      {
        id: "p6",
        name: "Aloe Vera",
        scientificName: "Aloe barbadensis miller",
        image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800",
        description: "Succulent with healing gel for skin burns.",
        care: "Bright direct light, water sparingly.",
        cost: 20,
        rating: 4.8,
        stock: 30,
        height: "1-2 ft"
      }
    ]
  }
];

const users = [];

module.exports = { plants, users };
