import sv from "ra-language-swedish";

export default {
    ra: {
        ...sv.ra,
        saved_queries: {
            label: 'Sparade filter',
            query_name: 'Nammn',
            new_label: 'Save current query...',
            new_dialog_title: 'Save current query as',
            remove_label: 'Remove saved query',
            remove_label_with_name: 'Remove query "%{name}"',
            remove_dialog_title: 'Remove saved query?',
            remove_message:
                'Are you sure you want to remove that item from your list of saved queries?',
            help: 'Filter the list and save this query for later',
        },
    },
    resources: {
        "Members": {
            "name": "Medlemmar",
            "fields": {
                "Name": "För och efternamnn",
                "Phone": "Mobilnummer",
                "Churche": "Kyrka",
                "Gender": "Kön",
                "Grade": "Årskurs",
                "Group": "Grupp",
                "Bulding": "Byggnad",
                "Room": "Rumsnummer"
            }
        }
    },
    "common": {
        "gender": {
            "male": "Kille |||| Killar",
            "female": "Tjej |||| Tjejer"
        }
    }
}