// ============================================================
// 3. Literal Type: só estas quatro categorias são aceitas
// ============================================================
type Categoria = "tecnologia" | "financas" | "literatura" | "outros";

// Lista com as mesmas categorias, usada para validar o valor vindo do <select>
const CATEGORIAS: Categoria[] = ["tecnologia", "financas", "literatura", "outros"];

// ============================================================
// 2. Interface: o "contrato" de um livro
// ============================================================
interface ILivro {
    readonly id: number;
    titulo: string;
    autor: string;
    ano: number;
    categoria: Categoria;
    editora?: string; // opcional
}

// ============================================================
// 4. Classe Livro, que implementa a interface
// ============================================================
class Livro implements ILivro {
    // [Desafio 1] Contador compartilhado por todos os livros (static).
    // Cada livro novo pega o valor atual e o contador avança.
    private static proximoId = 1;

    readonly id: number;
    titulo: string;
    autor: string;
    ano: number;
    categoria: Categoria;
    editora?: string;

    // [Desafio 2] editora tem "?": pode ser informada ou não
    constructor(titulo: string, autor: string, ano: number, categoria: Categoria, editora?: string) {
        this.id = Livro.proximoId++;
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
        this.categoria = categoria;
        this.editora = editora;
    }
}

// ============================================================
// 5. Array de livros
// ============================================================
const livros: Livro[] = [];

// Elementos da página. O "as" diz ao TypeScript qual é o tipo do elemento,
// para podermos usar .value, .reset() etc.
const formulario = document.getElementById("formLivro") as HTMLFormElement;
const campoTitulo = document.getElementById("titulo") as HTMLInputElement;
const campoAutor = document.getElementById("autor") as HTMLInputElement;
const campoAno = document.getElementById("ano") as HTMLInputElement;
const campoCategoria = document.getElementById("categoria") as HTMLSelectElement;
const campoEditora = document.getElementById("editora") as HTMLInputElement;
const listaLivros = document.getElementById("listaLivros") as HTMLUListElement;

// Confere se um texto qualquer é uma Categoria válida.
// O retorno "valor is Categoria" avisa o TypeScript: se der true, trate como Categoria.
function ehCategoria(valor: string): valor is Categoria {
    return CATEGORIAS.includes(valor as Categoria);
}

// Quando o usuário clica em "Cadastrar livro"
formulario.addEventListener("submit", (evento: SubmitEvent) => {
    evento.preventDefault(); // impede a página de recarregar

    // 1. Obter os dados do formulário
    const titulo = campoTitulo.value.trim();
    const autor = campoAutor.value.trim();
    const ano = Number(campoAno.value);
    const categoria = campoCategoria.value;
    const editora = campoEditora.value.trim();

    if (titulo === "" || autor === "" || !Number.isInteger(ano) || !ehCategoria(categoria)) {
        alert("Preencha título, autor, ano e categoria corretamente.");
        return;
    }

    // 2. Criar o objeto Livro (editora vazia vira undefined = não informada)
    const livro = new Livro(titulo, autor, ano, categoria, editora === "" ? undefined : editora);

    // 3. Adicionar ao array
    livros.push(livro);

    // 4. Limpar o formulário
    formulario.reset();
    campoTitulo.focus();

    // Atualizar a listagem
    visualizarLivros(livros);
});

// ============================================================
// 6. Função visualizarLivros
// ============================================================
function visualizarLivros(livros: Livro[]): void {
    listaLivros.innerHTML = ""; // apaga a listagem anterior

    if (livros.length === 0) {
        const vazio = document.createElement("li");
        vazio.textContent = "Nenhum livro no fichário ainda. Preencha a nova ficha para cadastrar o primeiro.";
        listaLivros.appendChild(vazio);
        return;
    }

    for (const livro of livros) {
        const item = document.createElement("li");
        item.dataset.categoria = livro.categoria; // usado pelo CSS para a aba colorida

        const titulo = document.createElement("strong");
        titulo.textContent = livro.titulo;
        item.appendChild(titulo);

        const detalhes = document.createElement("p");
        detalhes.textContent = `Autor: ${livro.autor} | Ano: ${livro.ano} | Categoria: ${livro.categoria}`;
        item.appendChild(detalhes);

        // Editora só aparece quando foi informada
        if (livro.editora !== undefined) {
            const editora = document.createElement("p");
            editora.textContent = `Editora: ${livro.editora}`;
            item.appendChild(editora);
        }

        listaLivros.appendChild(item);
    }
}

// Mostra a lista (vazia) ao abrir a página
visualizarLivros(livros);
