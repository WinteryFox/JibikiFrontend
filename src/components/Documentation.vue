<template>
    <div>
        <md-content class="md-elevation-3">
            <div class="introduction">
                <h1>Introduction</h1>
                You've found your way to the API documentation, greetings!
                All endpoints start with <span class="route">https://api.jibiki.com</span>
                and every response is in JSON.
            </div>
        </md-content>
        <md-content class="md-elevation-3" :key="doc.route" v-for="doc in documentation">
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <h3 class="route">
                        {{doc.route}}
                        <md-chip class="md-primary">{{doc.type}}</md-chip>
                    </h3>
                    <div>
                        <h5>Description</h5>
                        <p>{{doc.description}}</p>
                    </div>
                    <div>
                        <h5>Parameters</h5>
                        <md-table>
                            <md-table-row>
                                <md-table-head>Parameter</md-table-head>
                                <md-table-head>Description</md-table-head>
                            </md-table-row>
                            <md-table-row :key="parameter.parameter" v-for="parameter in doc.parameters">
                                <md-table-cell>{{parameter.parameter}}</md-table-cell>
                                <md-table-cell>{{parameter.description}}</md-table-cell>
                            </md-table-row>
                        </md-table>
                    </div>
                </div>
                <div class="md-layout-item">
                    <h4>Example payload for <span class="route">{{doc.example}}</span></h4>
                    <pre><code><span :key="i"
                                     v-for="(line, i) in highlight(doc.payload).split(/\n/)"><span class="number">{{i + 1}}</span> <span
                            v-html="line + '\n'" :key="line"></span></span></code></pre>
                </div>
            </div>
            <md-divider/>
        </md-content>
    </div>
</template>

<style lang="scss">
    @import "~vue-material/dist/theme/engine";

    .number {
        color: md-get-palette-color(gray, 600);
    }

    .key {
        color: md-get-palette-color(purple, 300);
    }

    .value {
        color: md-get-palette-color(lightgreen, 400);
    }

    .boolean {
        color: md-get-palette-color(orange, 700);
    }

    .null {
        color: md-get-palette-color(orange, 700);
    }

    .integer {
        color: md-get-palette-color(lightblue, A200);
    }

    .brace {
        color: md-get-palette-color(gray, 200);
    }
</style>

<style scoped lang="scss">
    @import "~vue-material/dist/theme/engine";

    .route {
        color: md-get-palette-color(pink, A100);
    }

    .introduction {
        padding: 20px;
    }

    pre code {
        background-color: md-get-palette-color(gray, 900);
        border: 1px solid md-get-palette-color(gray, 500);
        display: block;
        font-size: 12px;
        padding: 10px;
        max-width: 430px;
        max-height: 600px;
        overflow: auto;
    }

    .md-layout {
        margin: 15px;
    }
</style>

<script>
    export default {
        name: "Documentation",

        methods: {
            highlight(json) {
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|([\[{}\],]))/g, function (match) {
                    let cls = 'integer';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'value';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    } else if (/[\[{}\],]/.test(match)) {
                        cls = 'brace';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }
        },

        data: () => ({
            documentation: [
                {
                    "route": "/word",
                    "type": "GET",
                    "description": "Query for any word",
                    "parameters": [
                        {
                            "parameter": "q",
                            "description": "The word to search for in Japanese or English"
                        }
                    ],
                    "example": "/word?q=house",
                    "payload": "[\n" +
                        "  {\n" +
                        "    \"id\": 17578,\n" +
                        "    \"forms\": [\n" +
                        "      {\n" +
                        "        \"kanji\": \"家\",\n" +
                        "        \"kanji_info\": null,\n" +
                        "        \"reading\": \"いえ\",\n" +
                        "        \"reading_info\": null\n" +
                        "      }\n" +
                        "    ],\n" +
                        "    \"senses\": [\n" +
                        "      {\n" +
                        "        \"gloss\": [\n" +
                        "          \"dwelling\",\n" +
                        "          \"house\",\n" +
                        "          \"residence\"\n" +
                        "        ],\n" +
                        "        \"pos\": [\n" +
                        "          \"n\"\n" +
                        "        ],\n" +
                        "        \"pos_info\": [\n" +
                        "          \"noun (common) (futsuumeishi)\"\n" +
                        "        ],\n" +
                        "        \"fld\": [],\n" +
                        "        \"fld_info\": [],\n" +
                        "        \"notes\": null,\n" +
                        "        \"misc\": null\n" +
                        "      },\n" +
                        "      {\n" +
                        "        \"gloss\": [\n" +
                        "          \"family\",\n" +
                        "          \"household\"\n" +
                        "        ],\n" +
                        "        \"pos\": [\n" +
                        "          \"n\"\n" +
                        "        ],\n" +
                        "        \"pos_info\": [\n" +
                        "          \"noun (common) (futsuumeishi)\"\n" +
                        "        ],\n" +
                        "        \"fld\": [],\n" +
                        "        \"fld_info\": [],\n" +
                        "        \"notes\": null,\n" +
                        "        \"misc\": null\n" +
                        "      },\n" +
                        "      {\n" +
                        "        \"gloss\": [\n" +
                        "          \"family name\",\n" +
                        "          \"lineage\"\n" +
                        "        ],\n" +
                        "        \"pos\": [\n" +
                        "          \"n\"\n" +
                        "        ],\n" +
                        "        \"pos_info\": [\n" +
                        "          \"noun (common) (futsuumeishi)\"\n" +
                        "        ],\n" +
                        "        \"fld\": [],\n" +
                        "        \"fld_info\": [],\n" +
                        "        \"notes\": null,\n" +
                        "        \"misc\": null\n" +
                        "      }\n" +
                        "    ]\n" +
                        "  }\n" +
                        "]"
                },
                {
                    "route": "/kanji",
                    "type": "GET",
                    "description": "Query for any single kanji",
                    "parameters": [
                        {
                            "parameter": "q",
                            "description": "The kanji to search for"
                        }
                    ],
                    "example": "/kanji?q=日",
                    "payload": "[\n" +
                        "  {\n" +
                        "    \"id\": 2160,\n" +
                        "    \"literal\": \"日\",\n" +
                        "    \"meaning\": [\n" +
                        "      \"Japan\",\n" +
                        "      \"counter for days\",\n" +
                        "      \"day\",\n" +
                        "      \"sun\"\n" +
                        "    ],\n" +
                        "    \"kunyomi\": [\n" +
                        "      \"ひ\",\n" +
                        "      \"-び\",\n" +
                        "      \"-か\"\n" +
                        "    ],\n" +
                        "    \"onyomi\": [\n" +
                        "      \"ニチ\",\n" +
                        "      \"ジツ\"\n" +
                        "    ],\n" +
                        "    \"grade\": 1,\n" +
                        "    \"strokeCount\": 4,\n" +
                        "    \"frequency\": 1,\n" +
                        "    \"jlpt\": 4,\n" +
                        "    \"radicalName\": null\n" +
                        "  }\n" +
                        "]"
                }
            ]
        }),
    }
</script>