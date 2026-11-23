# Cadastro de Livros

Página web para cadastrar e listar livros, feita em **TypeScript** como atividade avaliativa da disciplina **Programação para Dispositivos Móveis e Sem Fio** (Tecnologia em Sistemas para Internet, IF Sudeste MG, Campus Barbacena).

Cada livro preenchido no formulário vira um objeto da classe `Livro`, é guardado num array e aparece na tela como uma ficha catalográfica de biblioteca.

## Funcionalidades

- Formulário com título, autor, ano de publicação e categoria (obrigatórios) e editora (opcional)
- Categorias permitidas: tecnologia, finanças, literatura e outros
- Identificador (`id`) gerado automaticamente para cada livro
- Lista atualizada a cada cadastro, mostrando a editora apenas quando ela foi informada
- Layout responsivo (computador e celular)

## Tecnologias

- HTML5 e CSS3
- TypeScript (transpilado para JavaScript com `tsc`)

## Estrutura do projeto

```
cadastro-livros/
├── index.html      # página com o formulário e a área da lista
├── style.css       # visual da página
├── tsconfig.json   # configuração do TypeScript
├── src/
│   └── main.ts     # código-fonte em TypeScript
└── dist/
    └── main.js     # JavaScript gerado pelo tsc (é o que o navegador executa)
```

## Como executar

1. Instale o [Node.js](https://nodejs.org) e, em seguida, o TypeScript:
   ```bash
   npm install -g typescript
   ```
2. Na pasta do projeto, gere o JavaScript (o `--watch` recompila a cada alteração salva):
   ```bash
   tsc --watch
   ```
3. Abra o `index.html` no navegador.

O repositório já inclui o `dist/main.js` gerado, então a página também funciona apenas abrindo o `index.html`, sem instalar nada.

## Conceitos de TypeScript utilizados

| Conceito | Onde aparece em `src/main.ts` |
| :--- | :--- |
| Literal type | `type Categoria = "tecnologia" \| "financas" \| "literatura" \| "outros"` |
| Interface | `interface ILivro`, com propriedade `readonly id` e propriedade opcional `editora?` |
| Classe que implementa interface | `class Livro implements ILivro` |
| Atributo estático | `private static proximoId`, contador que gera o `id` de cada livro |
| Parâmetro opcional | `editora?: string` no construtor de `Livro` |
| Array tipado | `const livros: Livro[] = []` |
| Type guard | `ehCategoria(valor: string): valor is Categoria`, que valida o valor vindo do `<select>` |
| Type assertion | `document.getElementById("titulo") as HTMLInputElement` |
| Função com tipos | `visualizarLivros(livros: Livro[]): void` |

## Observações

- Os livros ficam apenas na memória: ao recarregar a página, a lista volta vazia.
- O CSS foi aperfeiçoado com o auxílio de um agente de codificação com IA, conforme solicitado no enunciado da atividade.
