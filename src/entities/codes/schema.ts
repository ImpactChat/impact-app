export default {
  type: "object",
  "x-display": "tabs",
  "x-props": {
    grow: true
  },
  allOf: [
    {
      title: "Information",
      description: "Information de base au sujet du code",
      type: "object",
      required: ["name", "classeGroupe", "prof"],
      properties: {
        name: {
          type: "string",
          required: true,
          title: "Nom",
          description: "Nom du cours",
          maxLength: 127
        },
        // Needed for compat w/ server
        // eslint-disable-next-line prettier/prettier
        "classe_groupe": {
          type: "string",
          required: true,
          title: "Classe ou Groupe",
          description:
            "Classe ou groupe concerné par le cours (ex: 2V, 2LATIN, 2L&LG2...)",
          maxLength: 15
        },
        prof: {
          type: "string",
          required: true,
          title: "Professeur",
          maxLength: 31
        }
      }
    },
    {
      title: "Début-Fin",
      description: "Début et Fin du cours",
      type: "object",
      required: ["start", "end"],
      properties: {
        start: {
          type: "string",
          format: "date-time",
          required: true,
          title: "Début du cours"
        },
        end: {
          type: "string",
          format: "date-time",
          required: true,
          title: "Fin du cours"
        }
      }
    },
    {
      title: "Code",
      description: "Information about the code",
      type: "object",
      required: ["code", "link"],
      properties: {
        code: {
          type: "integer",
          required: true,
          title: "Code",
          description: "Le code du cours pour Zoom"
        },
        link: {
          type: "string",
          required: true,
          title: "Link",
          maxLength: 255,
          description: "Le lien vers Zoom"
        }
      }
    }
  ]
};
