<template>
    <div>
        <h1>Introduction</h1>
        <p>
            You've found your way to the API documentation, greetings!
            All endpoints start with <span class="route">https://api.jibiki.com</span>
        </p>
        <md-content class="md-elevation-3" :key="doc.route" v-for="doc in documentation">
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <h3 class="route">
                        {{doc.route}}
                        <md-chip class="md-primary">{{doc.type}}</md-chip>
                    </h3>
                    <div>
                        <h3>Description</h3>
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
                    <pre><code v-html="highlight(doc.payload)"></code></pre>
                </div>
            </div>
            <md-divider/>
        </md-content>
    </div>
</template>

<style scoped lang="scss">
    .route {
        color: hotpink;
    }

    pre code {
        background-color: #141414;
        border: 1px solid #d1e8ff;
        display: block;
        font-size: 12px;
        padding: 10px;
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
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                    let cls = 'darkorange';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'red';
                        } else {
                            cls = 'green';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'blue';
                    } else if (/null/.test(match)) {
                        cls = 'magenta';
                    }
                    return '<span style="color: ' + cls + '">' + match + '</span>';
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
                        "    \"id\": 17579,\n" +
                        "    \"forms\": [\n" +
                        "      {\n" +
                        "        \"kanji\": \"家\",\n" +
                        "        \"kanji_info\": null,\n" +
                        "        \"reading\": \"うち\",\n" +
                        "        \"reading_info\": null\n" +
                        "      },\n" +
                        "      {\n" +
                        "        \"kanji\": \"家\",\n" +
                        "        \"kanji_info\": null,\n" +
                        "        \"reading\": \"ち\",\n" +
                        "        \"reading_info\": null\n" +
                        "      }\n" +
                        "    ],\n" +
                        "    \"senses\": [\n" +
                        "      {\n" +
                        "        \"gloss\": [\n" +
                        "          \"home (one's own)\",\n" +
                        "          \"house\"\n" +
                        "        ],\n" +
                        "        \"pos\": [\n" +
                        "          \"adj-no\",\n" +
                        "          \"n\"\n" +
                        "        ],\n" +
                        "        \"pos_info\": [\n" +
                        "          \"nouns which may take the genitive case particle `no'\",\n" +
                        "          \"noun (common) (futsuumeishi)\"\n" +
                        "        ],\n" +
                        "        \"fld\": [],\n" +
                        "        \"fld_info\": [],\n" +
                        "        \"notes\": null,\n" +
                        "        \"misc\": \"word usually written using kana alone\"\n" +
                        "      },\n" +
                        "      {\n" +
                        "        \"gloss\": [\n" +
                        "          \"(one's) family\",\n" +
                        "          \"(one's) household\"\n" +
                        "        ],\n" +
                        "        \"pos\": [\n" +
                        "          \"pn\"\n" +
                        "        ],\n" +
                        "        \"pos_info\": [\n" +
                        "          \"pronoun\"\n" +
                        "        ],\n" +
                        "        \"fld\": [],\n" +
                        "        \"fld_info\": [],\n" +
                        "        \"notes\": null,\n" +
                        "        \"misc\": \"word usually written using kana alone\"\n" +
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