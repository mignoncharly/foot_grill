// Language dictionaries
const translations = {
    en: {
        mainTitle: "Grill Party Participation Tracker",
        mainDescription: "Register what you'll bring to the grill party!",
        formTitle: "Add Your Contribution",
        categoryLabel: "Category",
        selectCategoryOption: "Select category",
        meatOption: "Meat",
        drinksOption: "Drinks",
        saucesOption: "Sauces",
        sidesOption: "Sides/Accompaniments",
        utensilsOption: "Utensils",
        itemLabel: "Item",
        selectItemOption: "Select item",
        quantityLabel: "Quantity",
        unitLabel: "Unit",
        nameLabel: "Your Name",
        submitBtn: "Submit",
        contributionsTitle: "Current Contributions",
        adminTitle: "Admin View",
        nameHeader: "Name",
        categoryHeader: "Category",
        itemHeader: "Item",
        quantityHeader: "Quantity",
        commentHeader: "Comment",
        commentLabel: "Comment (Optional)",
        commentPlaceholder: "Any special notes or details",
        noContributions: "No contributions yet",
        maxQuantityReached: "Maximum quantity for this item has been reached!",
        submissionSuccess: "Your contribution has been added successfully!", 
        // Alert customization
        alertTitles: {
            success: "Success!",
            error: "Error",
            warning: "Warning",
            info: "Information"
        },
        alertButtons: {
            ok: "Ok",
            yes: "Yes",
            no: "No",
            cancel: "Cancel"
        },
        // Admin functionality
        resetAllBtnText: "Reset All",
        deleteConfirmTitle: "Confirm Delete",
        deleteConfirmMessage: "Are you sure you want to delete all contributions? This cannot be undone.",
        deleteSuccess: "All contributions have been successfully deleted.",
        deleteItemSuccess: "The contribution has been successfully deleted.",
        // Units of measurement
        units: {
            meat: "kg",
            drinks: {
                beer: "crates",
                juice: "bottles",
                rose: "bottles",
                wine: "bottles",
                water: "bottles",
                soda: "packs"
            },
            sauces: "bottles",
            sides: "servings",
            utensils: "packs"
        },
        meat: {
            lamb: "Lamb (Agneau)",
            beef: "Beef (Boeuf)",
            mutton: "Mutton (Mouton)",
            pork: "Pork (Porc)",
            fish: "Fish (Poisson)",
            sausages: "Sausages (Saucisses)",
            turkey: "Turkey (Puten)"
        },
        drinks: {
            beer: "Beer",
            juice: "Juice",
            rose: "Rosé",
            wine: "Wine",
            water: "Water",
            soda: "Soda"
        },
        sauces: {
            mayonnaise: "Mayonnaise",
            remoulade: "Remoulade",
            ketchup: "Ketchup",
            mustard: "Mustard",
            bbq: "BBQ Sauce"
        },
        sides: {
            bread: "Bread",
            bobolo: "Bobolo",
            beignets: "Beignets",
            fries: "French Fries (Pommes Frites)",
            salad: "Salad",
            chips: "Chips"
        },
        utensils: {
            plates: "Disposable Plates",
            knives: "Knives",
            spoons: "Spoons",
            forks: "Forks",
            cups: "Cups",
            napkins: "Napkins"
        }
    },
    de: {
        mainTitle: "Grillparty-Teilnehmer-Tracker",
        mainDescription: "Registrieren Sie, was Sie zur Grillparty mitbringen werden!",
        formTitle: "Fügen Sie Ihren Beitrag hinzu",
        categoryLabel: "Kategorie",
        selectCategoryOption: "Kategorie auswählen",
        meatOption: "Fleisch",
        drinksOption: "Getränke",
        saucesOption: "Saucen",
        sidesOption: "Beilagen",
        utensilsOption: "Utensilien",
        itemLabel: "Artikel",
        selectItemOption: "Artikel auswählen",
        quantityLabel: "Menge",
        unitLabel: "Einheit",
        nameLabel: "Ihr Name",
        submitBtn: "Absenden",
        contributionsTitle: "Aktuelle Beiträge",
        adminTitle: "Admin-Ansicht",
        nameHeader: "Name",
        categoryHeader: "Kategorie",
        itemHeader: "Artikel",
        quantityHeader: "Menge",
        commentHeader: "Kommentar",
        commentLabel: "Kommentar (Optional)",
        commentPlaceholder: "Besondere Hinweise oder Details",
        noContributions: "Noch keine Beiträge",
        maxQuantityReached: "Die maximale Menge für diesen Artikel wurde erreicht!",
        submissionSuccess: "Ihr Beitrag wurde erfolgreich hinzugefügt!",
        // Alert customization
        alertTitles: {
            success: "Erfolg!",
            error: "Fehler",
            warning: "Warnung",
            info: "Information"
        },
        alertButtons: {
            ok: "Ok",
            yes: "Ja",
            no: "Nein",
            cancel: "Abbrechen"
        },
        // Admin functionality
        resetAllBtnText: "Alle Zurücksetzen",
        deleteConfirmTitle: "Löschen Bestätigen",
        deleteConfirmMessage: "Sind Sie sicher, dass Sie alle Beiträge löschen möchten? Dies kann nicht rückgängig gemacht werden.",
        deleteSuccess: "Alle Beiträge wurden erfolgreich gelöscht.",
        deleteItemSuccess: "Der Beitrag wurde erfolgreich gelöscht.",
        // Units of measurement
        units: {
            meat: "kg",
            drinks: {
                beer: "Kästen",
                juice: "Flaschen",
                rose: "Flaschen",
                wine: "Flaschen",
                water: "Flaschen",
                soda: "Packungen"
            },
            sauces: "Flaschen",
            sides: "Portionen",
            utensils: "Packungen"
        },
        meat: {
            lamb: "Lamm (Agneau)",
            beef: "Rind (Boeuf)",
            mutton: "Hammel (Mouton)",
            pork: "Schwein (Porc)",
            fish: "Fisch (Poisson)",
            sausages: "Würstchen (Saucisses)",
            turkey: "Truthahn (Puten)"
        },
        drinks: {
            beer: "Bier",
            juice: "Saft",
            rose: "Rosé",
            wine: "Wein",
            water: "Wasser",
            soda: "Limonade"
        },
        sauces: {
            mayonnaise: "Mayonnaise",
            remoulade: "Remoulade",
            ketchup: "Ketchup",
            mustard: "Senf",
            bbq: "BBQ-Sauce"
        },
        sides: {
            bread: "Brot",
            bobolo: "Bobolo",
            beignets: "Beignets",
            fries: "Pommes Frites",
            salad: "Salat",
            chips: "Chips"
        },
        utensils: {
            plates: "Einwegteller",
            knives: "Messer",
            spoons: "Löffel",
            forks: "Gabeln",
            cups: "Becher",
            napkins: "Servietten"
        }
    }
};

// Maximum quantities for each item
const maxQuantities = {
    meat: {
        lamb: 5,
        beef: 8,
        mutton: 3,
        pork: 8,
        fish: 6,
        sausages: 15,
        turkey: 4
    },
    drinks: {
        beer: 20,
        juice: 10,
        rose: 5,
        wine: 8,
        water: 12,
        soda: 10
    },
    sauces: {
        mayonnaise: 2,
        remoulade: 2,
        ketchup: 2,
        mustard: 2,
        bbq: 2
    },
    sides: {
        bread: 10,
        bobolo: 8,
        beignets: 30,
        fries: 10,
        salad: 5,
        chips: 10
    },
    utensils: {
        plates: 50,
        knives: 30,
        spoons: 30,
        forks: 30,
        cups: 40,
        napkins: 100
    }
};