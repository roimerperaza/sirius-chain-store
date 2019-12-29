<template>
  <select class="form-control" v-model="countrySelected">
    <template v-for="(country, key) of countries">
      <option :disabled="country.value === ''" :value="country.value" :key="key">{{country.name}}</option>
    </template>
  </select>
</template>

<script>
export default {
  data() {
    return {
      countries: [
        {
          name: "Select country",
          value: ""
        },
        {
          name: "Afganistán",
          value: "Afganistán"
        },
        {
          name: "Albania",
          value: "Albania"
        },
        {
          name: "Alemania",
          value: "Alemania"
        },
        {
          name: "Andorra",
          value: "Andorra"
        },
        {
          name: "Angola",
          value: "Angola"
        },
        {
          name: "Anguila",
          value: "Anguila"
        },
        {
          name: "Anguila",
          value: "Anguila"
        },
        {
          name: "Antártida",
          value: "Antártida"
        },
        {
          name: "Antigua y Barbuda",
          value: "Antigua y Barbuda"
        },
        {
          name: "Antillas holandesas",
          value: "Antillas holandesas"
        },
        {
          name: "Arabia Saudí",
          value: "Arabia Saudí"
        },
        {
          name: "Argelia",
          value: "Argelia"
        },
        {
          name: "Argentina",
          value: "Argentina"
        },
        {
          name: "Argentina",
          value: "Argentina"
        },
        {
          name: "Armenia",
          value: "Armenia"
        },
        {
          name: "Aruba",
          value: "Aruba"
        },
        {
          name: "Australia",
          value: "Australia"
        },
        {
          name: "Austria",
          value: "Austria"
        },
        {
          name: "Azerbaiyán",
          value: "Azerbaiyán"
        },
        {
          name: "Bahamas",
          value: "Bahamas"
        },
        {
          name: "Bahrein",
          value: "Bahrein"
        },
        {
          name: "Bangladesh",
          value: "Bangladesh"
        },
        {
          name: "Barbados",
          value: "Barbados"
        },
        {
          name: "Bélgica",
          value: "Bélgica"
        },
        {
          name: "Belice",
          value: "Belice"
        },
        {
          name: "Benín",
          value: "Benín"
        },
        {
          name: "Bermudas",
          value: "Bermudas"
        },
        {
          name: "Bhután",
          value: "Bhután"
        },
        {
          name: "Bielorrusia",
          value: "Bielorrusia"
        },
        {
          name: "Birmania",
          value: "Birmania"
        },
        {
          name: "Bolivia",
          value: "Bolivia"
        },
        {
          name: "Bosnia y Herzegovina",
          value: "Bosnia y Herzegovina"
        },
        {
          name: "Botsuana",
          value: "Botsuana"
        },
        {
          name: "Brasil",
          value: "Brasil"
        },
        {
          name: "Brunei",
          value: "Brunei"
        },
        {
          name: "Bulgaria",
          value: "Bulgaria"
        },
        {
          name: "Burkina Faso",
          value: "Burkina Faso"
        },
        {
          name: "Burundi",
          value: "Burundi"
        },
        {
          name: "Cabo Verde",
          value: "Cabo Verde"
        },
        {
          name: "Cabo Verde",
          value: "Cabo Verde"
        },
        {
          name: "Camboya",
          value: "Camboya"
        },
        {
          name: "Camerún",
          value: "Camerún"
        },
        {
          name: "Canadá",
          value: "Canadá"
        },
        {
          name: "Chad",
          value: "Chad"
        },
        {
          name: "Chile",
          value: "Chile"
        },
        {
          name: "China",
          value: "China"
        },
        {
          name: "Chipre",
          value: "Chipre"
        },
        {
          name: "Ciudad estado del Vaticano",
          value: "Ciudad estado del Vaticano"
        },
        {
          name: "Colombia",
          value: "Colombia"
        },
        {
          name: "Comores",
          value: "Comores"
        },
        {
          name: "Congo",
          value: "Congo"
        },
        {
          name: "Corea",
          value: "Corea"
        },
        {
          name: "Corea del Norte",
          value: "Corea del Norte"
        },
        {
          name: "Costa del Marfíl",
          value: "Costa del Marfíl"
        },
        {
          name: "Costa Rica",
          value: "Costa Rica"
        },
        {
          name: "Croacia",
          value: "Croacia"
        },
        {
          name: "Cuba",
          value: "Cuba"
        },
        {
          name: "Dinamarca",
          value: "Dinamarca"
        },
        {
          name: "Djibouri",
          value: "Djibouri"
        },
        {
          name: "Dominica",
          value: "Dominica"
        },
        {
          name: "Ecuador",
          value: "Ecuador"
        },
        {
          name: "Egipto",
          value: "Egipto"
        },
        {
          name: "El Salvador",
          value: "El Salvador"
        },
        {
          name: "Emiratos Arabes Unidos",
          value: "Emiratos Arabes Unidos"
        },
        {
          name: "Eritrea",
          value: "Eritrea"
        },
        {
          name: "Eslovaquia",
          value: "Eslovaquia"
        },
        {
          name: "Eslovenia",
          value: "Eslovenia"
        },
        {
          name: "España",
          value: "España"
        },
        {
          name: "Estados Unidos",
          value: "Estados Unidos"
        },
        {
          name: "Estonia",
          value: "Estonia"
        },
        {
          name: "Etiopía",
          value: "Etiopía"
        },
        {
          name: "Ex-República Yugoslava de Macedonia",
          value: "Ex-República Yugoslava de Macedonia"
        },
        {
          name: "Filipinas",
          value: "Filipinas"
        },
        {
          name: "Finlandia",
          value: "Finlandia"
        },
        {
          name: "Francia",
          value: "Francia"
        },
        {
          name: "Gabón",
          value: "Gabón"
        },
        {
          name: "Gambia",
          value: "Gambia"
        },
        {
          name: "Georgia del Sur y las islas Sandwich del Sur",
          value: "Georgia del Sur y las islas Sandwich del Sur"
        },
        {
          name: "Ghana",
          value: "Ghana"
        },
        {
          name: "Gibraltar",
          value: "Gibraltar"
        },
        {
          name: "Granada",
          value: "Granada"
        },
        {
          name: "Grecia",
          value: "Grecia"
        },
        {
          name: "Groenlandia",
          value: "Groenlandia"
        },
        {
          name: "Guadalupe",
          value: "Guadalupe"
        },
        {
          name: "Guam",
          value: "Guam"
        },
        {
          name: "Guatemala",
          value: "Guatemala"
        },
        {
          name: "Guayana",
          value: "Guayana"
        },
        {
          name: "Guayana francesa",
          value: "Guayana francesa"
        },
        {
          name: "Guinea",
          value: "Guinea"
        },
        {
          name: "Guinea Ecuatorial",
          value: "Guinea Ecuatorial"
        },
        {
          name: "Guinea-Bissau",
          value: "Guinea-Bissau"
        },
        {
          name: "Haití",
          value: "Haití"
        },
        {
          name: "Holanda",
          value: "Holanda"
        },
        {
          name: "Honduras",
          value: "Honduras"
        },
        {
          name: "Hong Kong R. A. E",
          value: "Hong Kong R. A. E"
        },
        {
          name: "Hungría",
          value: "Hungría"
        },
        {
          name: "India",
          value: "India"
        },
        {
          name: "Indonesia",
          value: "Indonesia"
        },
        {
          name: "Irak",
          value: "Irak"
        },
        {
          name: "Irán",
          value: "Irán"
        },
        {
          name: "Irlanda",
          value: "Irlanda"
        },
        {
          name: "Isla Bouvet",
          value: "Isla Bouvet"
        },
        {
          name: "Isla Christmas",
          value: "Isla Christmas"
        },
        {
          name: "Isla Heard e Islas McDonald",
          value: "Isla Heard e Islas McDonald"
        },
        {
          name: "Islandia",
          value: "Islandia"
        },
        {
          name: "Islas Caimán",
          value: "Islas Caimán"
        },
        {
          name: "Islas Cook",
          value: "Islas Cook"
        },
        {
          name: "Islas de Cocos o Keeling",
          value: "Islas de Cocos o Keeling"
        },
        {
          name: "Islas Faroe",
          value: "Islas Faroe"
        },
        {
          name: "Islas Fiyi",
          value: "Islas Fiyi"
        },
        {
          name: "Islas Malvinas Islas Falkland",
          value: "Islas Malvinas Islas Falkland"
        },
        {
          name: "Islas Marianas del norte",
          value: "Islas Marianas del norte"
        },
        {
          name: "Islas Marshall",
          value: "Islas Marshall"
        },
        {
          name: "Islas menores de Estados Unidos",
          value: "Islas menores de Estados Unidos"
        },
        {
          name: "Islas Palau",
          value: "Islas Palau"
        },
        {
          name: "Islas Salomón",
          value: "Islas Salomón"
        },
        {
          name: "Islas Tokelau",
          value: "Islas Tokelau"
        },
        {
          name: "Islas Turks y Caicos",
          value: "Islas Turks y Caicos"
        },
        {
          name: "Islas Vírgenes EE.UU.",
          value: "Islas Vírgenes EE.UU."
        },
        {
          name: "Islas Vírgenes Reino Unido",
          value: "Islas Vírgenes Reino Unido"
        },
        {
          name: "Israel",
          value: "Israel"
        },
        {
          name: "Italia",
          value: "Italia"
        },
        {
          name: "Jamaica",
          value: "Jamaica"
        },
        {
          name: "Japón",
          value: "Japón"
        },
        {
          name: "Jordania",
          value: "Jordania"
        },
        {
          name: "Kazajistán",
          value: "Kazajistán"
        },
        {
          name: "Kenia",
          value: "Kenia"
        },
        {
          name: "Kirguizistán",
          value: "Kirguizistán"
        },
        {
          name: "Kiribati",
          value: "Kiribati"
        },
        {
          name: "Kuwait",
          value: "Kuwait"
        },
        {
          name: "Laos",
          value: "Laos"
        },
        {
          name: "Lesoto",
          value: "Lesoto"
        },
        {
          name: "Letonia",
          value: "Letonia"
        },
        {
          name: "Líbano",
          value: "Líbano"
        },
        {
          name: "Liberia",
          value: "Liberia"
        },
        {
          name: "Libia",
          value: "Libia"
        },
        {
          name: "Liechtenstein",
          value: "Liechtenstein"
        },
        {
          name: "Lituania",
          value: "Lituania"
        },
        {
          name: "Luxemburgo",
          value: "Luxemburgo"
        },
        {
          name: "Macao R. A. E",
          value: "Macao R. A. E"
        },
        {
          name: "Madagascar",
          value: "Madagascar"
        },
        {
          name: "Malasia",
          value: "Malasia"
        },
        {
          name: "Malawi",
          value: "Malawi"
        },
        {
          name: "Maldivas",
          value: "Maldivas"
        },
        {
          name: "Malí",
          value: "Malí"
        },
        {
          name: "Malta",
          value: "Malta"
        },
        {
          name: "Marruecos",
          value: "Marruecos"
        },
        {
          name: "Martinica",
          value: "Martinica"
        },
        {
          name: "Mauricio",
          value: "Mauricio"
        },
        {
          name: "Mauritania",
          value: "Mauritania"
        },
        {
          name: "Mayotte",
          value: "Mayotte"
        },
        {
          name: "México",
          value: "México"
        },
        {
          name: "Micronesia",
          value: "Micronesia"
        },
        {
          name: "Moldavia",
          value: "Moldavia"
        },
        {
          name: "Mónaco",
          value: "Mónaco"
        },
        {
          name: "Mongolia",
          value: "Mongolia"
        },
        {
          name: "Montserrat",
          value: "Montserrat"
        },
        {
          name: "Mozambique",
          value: "Mozambique"
        },
        {
          name: "Namibia",
          value: "Namibia"
        },
        {
          name: "Nauru",
          value: "Nauru"
        },
        {
          name: "Nepal",
          value: "Nepal"
        },
        {
          name: "Nicaragua",
          value: "Nicaragua"
        },
        {
          name: "Níger",
          value: "Níger"
        },
        {
          name: "Nigeria",
          value: "Nigeria"
        },
        {
          name: "Niue",
          value: "Niue"
        },
        {
          name: "Norfolk",
          value: "Norfolk"
        },
        {
          name: "Noruega",
          value: "Noruega"
        },
        {
          name: "Nueva Caledonia",
          value: "Nueva Caledonia"
        },
        {
          name: "Nueva Zelanda",
          value: "Nueva Zelanda"
        },
        {
          name: "Omán",
          value: "Omán"
        },
        {
          name: "Panamá",
          value: "Panamá"
        },
        {
          name: "Papua Nueva Guinea",
          value: "Papua Nueva Guinea"
        },
        {
          name: "Paquistán",
          value: "Paquistán"
        },
        {
          name: "Paraguay",
          value: "Paraguay"
        },
        {
          name: "Perú",
          value: "Perú"
        },
        {
          name: "Pitcairn",
          value: "Pitcairn"
        },
        {
          name: "Polinesia francesa",
          value: "Polinesia francesa"
        },
        {
          name: "Polonia",
          value: "Polonia"
        },
        {
          name: "Portugal",
          value: "Portugal"
        },
        {
          name: "Puerto Rico",
          value: "Puerto Rico"
        },
        {
          name: "Polonia",
          value: "Polonia"
        },
        {
          name: "Portugal",
          value: "Portugal"
        },
        {
          name: "Puerto Rico",
          value: "Puerto Rico"
        },
        {
          name: "Qatar",
          value: "Qatar"
        },
        {
          name: "Reino Unido",
          value: "Reino Unido"
        },
        {
          name: "República Centroafricana",
          value: "República Centroafricana"
        },
        {
          name: "República Checa",
          value: "República Checa"
        },
        {
          name: "República de Sudáfrica",
          value: "República de Sudáfrica"
        },
        {
          name: "República Democrática del Congo Zaire",
          value: "República Democrática del Congo Zaire"
        },
        {
          name: "República Dominicana",
          value: "República Dominicana"
        },
        {
          name: "Reunión",
          value: "Reunión"
        },
        {
          name: "Ruanda",
          value: "Ruanda"
        },
        {
          name: "Rumania",
          value: "Rumania"
        },
        {
          name: "Rusia",
          value: "Rusia"
        },
        {
          name: "Samoa",
          value: "Samoa"
        },
        {
          name: "Samoa occidental",
          value: "Samoa occidental"
        },
        {
          name: "San Kitts y Nevis",
          value: "San Kitts y Nevis"
        },
        {
          name: "San Pierre y Miquelon",
          value: "San Pierre y Miquelon"
        },
        {
          name: "San Vicente e Islas Granadinas",
          value: "San Vicente e Islas Granadinas"
        },
        {
          name: "Santa Helena",
          value: "Santa Helena"
        },
        {
          name: "Santa Lucía",
          value: "Santa Lucía"
        },
        {
          name: "Santo Tomé y Príncipe",
          value: "Santo Tomé y Príncipe"
        },
        {
          name: "Senegal",
          value: "Senegal"
        },
        {
          name: "Serbia y Montenegro",
          value: "Serbia y Montenegro"
        },
        {
          name: "Sychelles",
          value: "Sychelles"
        },
        {
          name: "Sierra Leona",
          value: "Sierra Leona"
        },
        {
          name: "Singapur",
          value: "Singapur"
        },
        {
          name: "Siria",
          value: "Siria"
        },
        {
          name: "Somalia",
          value: "Somalia"
        },
        {
          name: "Sri Lanka",
          value: "Sri Lanka"
        },
        {
          name: "Suazilandia",
          value: "Suazilandia"
        },
        {
          name: "Sudán",
          value: "Sudán"
        },
        {
          name: "Suecia",
          value: "Suecia"
        },
        {
          name: "Suiza",
          value: "Suiza"
        },
        {
          name: "Surinam",
          value: "Surinam"
        },
        {
          name: "Svalbard",
          value: "Svalbard"
        },
        {
          name: "Tailandia",
          value: "Tailandia"
        },
        {
          name: "Taiwán",
          value: "Taiwán"
        },
        {
          name: "Tanzania",
          value: "Tanzania"
        },
        {
          name: "Tayikistán",
          value: "Tayikistán"
        },
        {
          name: "Territorios británicos del océano Indico",
          value: "Territorios británicos del océano Indico"
        },
        {
          name: "Territorios franceses del sur",
          value: "Territorios franceses del sur"
        },
        {
          name: "Timor Oriental",
          value: "Timor Oriental"
        },
        {
          name: "Togo",
          value: "Togo"
        },
        {
          name: "Tonga",
          value: "Tonga"
        },
        {
          name: "Trinidad y Tobago",
          value: "Trinidad y Tobago"
        },
        {
          name: "Túnez",
          value: "Túnez"
        },
        {
          name: "Turkmenistán",
          value: "Turkmenistán"
        },
        {
          name: "Turquía",
          value: "Turquía"
        },
        {
          name: "Tuvalu",
          value: "Tuvalu"
        },
        {
          name: "Ucrania",
          value: "Ucrania"
        },
        {
          name: "Uganda",
          value: "Uganda"
        },
        {
          name: "Uruguay",
          value: "Uruguay"
        },
        {
          name: "Uzbekistán",
          value: "Uzbekistán"
        },
        {
          name: "Vanuatu",
          value: "Vanuatu"
        },
        {
          name: "Venezuela",
          value: "Venezuela"
        },
        {
          name: "Vietnam",
          value: "Vietnam"
        },
        {
          name: "Wallis y Futuna",
          value: "Wallis y Futuna"
        },
        {
          name: "Yemen",
          value: "Yemen"
        },
        {
          name: "Zambia",
          value: "Zambia"
        },
        {
          name: "Zimbabue",
          value: "Zimbabue"
        }
      ]
    };
  },
  computed: {
    countrySelected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
