# Dimensão Alfa com Pelican

Este diretório agora concentra a versão estruturada do site em Pelican, mantendo a direção visual do protótipo que continua em [`../index.html`](../index.html) como referência de design original.

## Objetivo da migração

A homepage da raiz era um excelente protótipo editorial, mas estava toda concentrada em um único arquivo HTML com CSS e JavaScript inline. A migração feita aqui transforma essa proposta em uma base de tema reutilizável, com:

- templates Jinja organizados por responsabilidade;
- assets separados em CSS e JavaScript;
- conteúdo editorial em Markdown;
- rotas estáveis para home, blog, categorias e páginas internas;
- documentação para evolução futura.

## Estrutura atual

```text
pelican/
  content/
    blog/           # Artigos em Markdown
    data/           # JSON e outros dados estáticos para widgets e quizzes
    images/         # Imagens e capas estáticas copiadas para o build
    pages/          # Páginas institucionais e especiais
      biblioteca/   # Fichas editoriais e materiais do acervo
  theme/
    static/
      css/
        style.css   # Base visual migrada do protótipo + estilos Pelican
      js/
        biblioteca.js
        site.js     # Navegação e animações globais
        exercicios.js
    templates/
      partials/
        footer.html
        navigation.html
        pagination.html
      article.html
      base.html
      biblioteca.html
      biblioteca_item.html
      category.html
      exercicio.html
      exercicios.html
      home.html
      index.html
      page.html
  pelicanconf.py
  publishconf.py
  README.md
```

## Rotas geradas

- `/`:
  homepage editorial gerada a partir de `content/pages/home.md` com o template `home.html`
- `/blog/`:
  listagem paginada de artigos gerada pelo template `index.html`
- `/blog/<slug>.html`:
  página individual de artigo
- `/categoria/<slug>.html`:
  listagem por categoria
- `/biblioteca/<slug>.html`:
  fichas individuais de materiais do acervo
- `/exercicios/<slug>.html`:
  páginas individuais de coleções de exercícios
- `/<slug>.html`:
  páginas institucionais como `biblioteca.html`, `apps.html`, `projetos.html`, `shop.html` e `exercicios.html`

## Arquivos mais importantes

- [`pelicanconf.py`](./pelicanconf.py):
  concentra rotas, organização de conteúdo e dados globais usados pelo tema
- [`theme/templates/base.html`](./theme/templates/base.html):
  casca compartilhada do site
- [`theme/templates/home.html`](./theme/templates/home.html):
  homepage editorial baseada no design da raiz
- [`theme/templates/index.html`](./theme/templates/index.html):
  listagem do blog
- [`theme/templates/article.html`](./theme/templates/article.html):
  página de artigo
- [`theme/static/css/style.css`](./theme/static/css/style.css):
  CSS migrado do protótipo com extensões para páginas internas
- [`theme/static/js/site.js`](./theme/static/js/site.js):
  interações globais do site

## Como rodar localmente

Instale as dependências essenciais:

```bash
pip install pelican markdown
```

Depois, a partir da pasta `pelican`, gere o site:

```bash
pelican content
```

Para desenvolvimento com servidor local:

```bash
pelican --listen
```

## Como publicar

Use a configuração de publicação quando o `SITEURL` já estiver definido:

```bash
pelican content -s publishconf.py
```

## Como criar novos artigos

Crie arquivos em `content/blog/` com metadados no topo. Exemplo:

```md
Title: Título do artigo
Slug: meu-artigo
Date: 2026-04-20 10:00
Category: Cálculo
Tags: limites, funções
Summary: Resumo curto para cards e meta description.
Reading_Time: 7 min de leitura
Cover_Image: images/capa-calculo.svg

Texto do artigo em Markdown.
```

### Metadados recomendados

- `Title`
- `Slug`
- `Date`
- `Category`
- `Summary`
- `Reading_Time`
- `Cover_Image`
- `Tags`
- `Featured`

Use `Featured: true` em um artigo quando quiser destacá-lo na homepage.

## Como criar novas páginas

Crie arquivos em `content/pages/`. As páginas usam `page.html` por padrão, mas podem usar templates específicos com:

```md
Template: exercicios
```

Metadados úteis para páginas:

- `Title`
- `Slug`
- `Summary`
- `Subtitle`
- `Kicker`
- `Template`

## Como publicar novos materiais na biblioteca

O sistema da biblioteca agora segue a mesma lógica editorial do restante do site: cada material é uma página em Markdown com metadata rica, e a página principal `biblioteca.html` agrega tudo automaticamente.

### Estrutura recomendada

```text
content/
  pages/
    biblioteca.md
    biblioteca/
      trilha-limites-e-derivadas.md
      transformacoes-lineares-ficha.md
```

### Página de material

Crie um arquivo em `content/pages/biblioteca/`:

```md
Title: Transformações Lineares — Ficha de Leitura Geométrica
Slug: transformacoes-lineares-ficha
URL: biblioteca/transformacoes-lineares-ficha.html
Save_as: biblioteca/transformacoes-lineares-ficha.html
Template: biblioteca_item
Date: 2026-04-21 12:30
Library_Item: true
Material_Type: artigo
Topic: Álgebra
Level: Intermediário
Authors: Dimensão Alfa
Language: pt-BR
Library_Tags: algebra linear|matrizes|geometria|intuicao
Source_URL: blog/transformacoes-lineares-intuicao-geometrica.html
Summary: Resumo curto do material.

Texto editorial em Markdown.
```

### O que acontece automaticamente

- a página `biblioteca.html` lista o novo item;
- a busca client-side passa a indexá-lo automaticamente;
- filtros por tema, tipo, nível e idioma passam a incluí-lo;
- a ficha individual mostra metadados e materiais relacionados;
- itens do mesmo tema podem se relacionar automaticamente entre si.

### Campos recomendados para o acervo

- `Template: biblioteca_item`
- `Library_Item: true`
- `Material_Type`
- `Topic`
- `Level`
- `Authors`
- `Language`
- `Library_Tags`
- `Source_URL`
- `Summary`
- `Date`

Use `Featured: true` quando quiser destacar um material na home da biblioteca.

## Como publicar novas listas de exercícios

O sistema de exercícios agora usa uma arquitetura em duas camadas:

1. uma página Markdown com os metadados da coleção;
2. um arquivo JSON com as questões, alternativas e explicações.

### Estrutura recomendada

```text
content/
  pages/
    exercicios.md
    exercicios/
      limites-notaveis-01.md
  data/
    exercicios/
      limites-notaveis-01.json
```

### Página da coleção

Crie um arquivo em `content/pages/exercicios/`:

```md
Title: Lista 01 — Limites Notáveis
Slug: limites-notaveis-01
URL: exercicios/limites-notaveis-01.html
Save_as: exercicios/limites-notaveis-01.html
Template: exercicio
Date: 2026-04-21 09:00
Exercise_Collection: true
Topic: Cálculo
Level: Básico
Question_Count: 3 questões
Estimated_Time: 12 min
Questions_File: data/exercicios/limites-notaveis-01.json
Summary: Resumo curto da coleção.

Texto introdutório em Markdown.
```

### Arquivo de questões

Crie o JSON correspondente em `content/data/exercicios/`:

```json
{
  "title": "Lista 01 — Limites Notáveis",
  "questions": [
    {
      "question": "Enunciado da questão",
      "options": ["Alternativa A", "Alternativa B", "Alternativa C"],
      "correct": 1,
      "explanation": "Comentário pós-resposta"
    }
  ]
}
```

### O que acontece automaticamente

- a página `exercicios.html` lista a nova coleção sem editar template;
- o template `exercicio.html` carrega o JSON indicado em `Questions_File`;
- o JavaScript valida a estrutura antes de renderizar as questões;
- o conteúdo introdutório e os metadados ficam no Markdown, não no script.

### Campos recomendados para coleções

- `Template: exercicio`
- `Exercise_Collection: true`
- `Topic`
- `Level`
- `Question_Count`
- `Estimated_Time`
- `Questions_File`
- `Summary`
- `Date`

Use `Featured: true` quando quiser destacar uma coleção na página principal de exercícios.

## Como editar a homepage

A homepage deixou de ser um arquivo estático isolado. Agora ela é resultado de três camadas:

1. Estrutura visual em [`theme/templates/home.html`](./theme/templates/home.html)
2. Estilos globais em [`theme/static/css/style.css`](./theme/static/css/style.css)
3. Dados editoriais em [`pelicanconf.py`](./pelicanconf.py)

### O que editar em cada lugar

- Hero, seções e markup:
  `theme/templates/home.html`
- Navegação, footer, ticker, ferramentas, quote e textos globais:
  `pelicanconf.py`
- Artigo em destaque e cards do blog:
  `content/blog/`
- Paleta, layout, responsividade e animações:
  `theme/static/css/style.css`

## Convenções de manutenção

- Não volte a concentrar o site em um único HTML com CSS inline.
- Use `content/` para conteúdo e `theme/` para apresentação.
- Prefira adicionar novos blocos da home como seções de template, não como hardcodes dispersos.
- Se um dado aparecer em várias páginas, mova-o para `pelicanconf.py`.
- Se uma experiência interativa crescer demais, considere publicá-la como app estático em `content/apps/`.

## Relação com o `index.html` da raiz

O arquivo `../index.html` foi preservado como referência visual do conceito original. A base de trabalho para evolução do site, porém, agora está neste diretório `pelican/`.

Em outras palavras:

- o `index.html` da raiz é referência de direção de arte;
- o tema Pelican é a implementação mantida daqui para frente.

## Próximos passos recomendados

- adicionar um `content/apps/` para protótipos interativos independentes;
- conectar a newsletter a um serviço real;
- criar um template específico para páginas de série editorial;
- melhorar a taxonomia com tags e páginas temáticas;
- incorporar busca estática depois que o corpus de artigos crescer.
