from __future__ import annotations

AUTHOR = "Dimensão Alfa"
SITENAME = "Dimensão Alfa"
SITESUBTITLE = "Portal editorial de matemática, linguagem e investigação"
SITE_DESCRIPTION = (
    "Portal de matemática com artigos, biblioteca, exercícios e ferramentas "
    "para estudar da intuição à demonstração rigorosa."
)
SITEURL = ""

PATH = "content"
THEME = "theme"

OUTPUT_PATH = "../docs"

TIMEZONE = "America/Sao_Paulo"
DEFAULT_LANG = "pt-br"

ARTICLE_PATHS = ["blog"]
PAGE_PATHS = ["pages"]
STATIC_PATHS = ["images", "data"]

ARTICLE_URL = "blog/{slug}.html"
ARTICLE_SAVE_AS = "blog/{slug}.html"
INDEX_SAVE_AS = "blog/index.html"

PAGE_URL = "{slug}.html"
PAGE_SAVE_AS = "{slug}.html"

CATEGORY_URL = "categoria/{slug}.html"
CATEGORY_SAVE_AS = "categoria/{slug}.html"

TAG_SAVE_AS = ""
AUTHOR_SAVE_AS = ""
ARCHIVES_SAVE_AS = ""
CATEGORIES_SAVE_AS = ""
AUTHORS_SAVE_AS = ""
TAGS_SAVE_AS = ""

DEFAULT_PAGINATION = 6
DIRECT_TEMPLATES = ["index"]

DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

DEFAULT_METADATA = {
    "status": "published",
}

MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight"},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
        "markdown.extensions.sane_lists": {},
        "markdown.extensions.toc": {"permalink": False},
    },
    "output_format": "html5",
}

MATHJAX_ENABLED = True
COPYRIGHT_YEAR = 2026
DEFAULT_COVER_IMAGE = "images/capa-portal.svg"

NAV_ITEMS = [
    {"label": "Home", "url": ""},
    {"label": "Blog", "url": "blog/"},
    {"label": "Biblioteca", "url": "biblioteca.html"},
    {"label": "Apps", "url": "apps.html"},
    {"label": "Shop", "url": "shop.html", "is_cta": True},
]

HOME_HERO = {
    "eyebrow": "Portal de Matemática",
    "title_before": "Onde a ",
    "title_emphasis": "matemática",
    "title_after": " encontra a linguagem",
    "description": (
        "Artigos, vídeos, ferramentas e biblioteca para quem quer entender "
        "a matemática além das fórmulas, da intuição à demonstração rigorosa."
    ),
    "primary_cta_label": "Explorar Blog",
    "primary_cta_url": "blog/",
    "secondary_cta_label": "Ver Biblioteca",
    "secondary_cta_url": "biblioteca.html",
    "formula_tags": ["Análise", "Números Complexos", "Cálculo"],
}

HOME_TICKER_TOPICS = [
    "Cálculo Diferencial",
    "Álgebra Linear",
    "Teoria dos Números",
    "Geometria Diferencial",
    "Análise Real",
    "Topologia",
    "Equações Diferenciais",
    "Probabilidade",
]

HOME_CATEGORY_LIMIT = 6
HOME_RECENT_POST_LIMIT = 3

CATEGORY_SYMBOLS = {
    "Cálculo": "∫",
    "Álgebra": "A",
    "Geometria": "△",
    "Análise": "ℝ",
    "Probabilidade": "ℙ",
    "Teoria dos Números": "ℤ",
}

CATEGORY_SHORT_LABELS = {
    "Teoria dos Números": "T. Números",
}

HOME_TOOLS = [
    {
        "icon": "∂",
        "name": "Calculadora de Limites",
        "description": "Resolva limites passo a passo com visualização gráfica interativa.",
        "url": "apps.html",
    },
    {
        "icon": "⊗",
        "name": "Multiplicação de Matrizes",
        "description": "Calcule produtos matriciais e visualize o efeito geométrico da transformação.",
        "url": "apps.html",
    },
    {
        "icon": "𝔽",
        "name": "Gerador de Questões",
        "description": "Pratique com questões geradas dinamicamente por nível de dificuldade.",
        "url": "exercicios.html",
    },
    {
        "icon": "⌘",
        "name": "Biblioteca",
        "description": "Referências, livros recomendados e materiais organizados por área.",
        "url": "biblioteca.html",
    },
]

HOME_QUOTE = {
    "text": "A matemática é a linguagem na qual Deus escreveu o universo.",
    "author": "Galileu Galilei",
}

NEWSLETTER = {
    "title": "Novos artigos na sua caixa de entrada",
    "description": "Receba os melhores conteúdos de matemática, ferramentas e novidades do portal.",
    "placeholder": "seu@email.com",
    "button_label": "Inscrição em breve",
    "action": "",
    "note": "Conecte um provedor de newsletter no arquivo pelicanconf.py para ativar esta seção.",
}

FOOTER_DESCRIPTION = (
    "Arte, tecnologia, ciência e informação. Trazendo conhecimento em doses de esperança."
)

FOOTER_COLUMNS = [
    {
        "title": "Conteúdo",
        "links": [
            {"label": "Blog", "url": "blog/"},
            {"label": "Biblioteca", "url": "biblioteca.html"},
            {"label": "Apps", "url": "apps.html"},
            {"label": "Projetos", "url": "projetos.html"},
        ],
    },
    {
        "title": "YouTube",
        "links": [
            {"label": "Dimensão Alfa", "url": "https://www.youtube.com/@dimensaoalfa"},
            {"label": "Dimensão Alfa TV", "url": "https://www.youtube.com/@DimensaoAlfaTV"},
            {"label": "WSRicardo", "url": "https://www.youtube.com/@wsricardo23"},
        ],
    },
    {
        "title": "Links",
        "links": [
            {"label": "Blog WSRicardo", "url": "https://wsricardo.blogspot.com"},
            {"label": "Blog Principal", "url": "https://www.dimensaoalfa.com.br/blog"},
            {"label": "Shop", "url": "shop.html"},
        ],
    },
]

FOOTER_SOCIAL_LINKS = [
    {"label": "YouTube", "url": "https://www.youtube.com/@dimensaoalfa"},
    {"label": "Blog", "url": "https://www.dimensaoalfa.com.br/blog"},
    {"label": "Telegram", "url": "https://t.me/"},
]
