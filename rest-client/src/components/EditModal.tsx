import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "#000000"
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Função para buscar o produto pelo ID
  const fetchProduto = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:8080/api/produtos/${productId}`);
      setProduto(response.data);
    } catch (err) {
      setError("Erro ao buscar o produto. Verifique o ID.");
      setProduto(null);
    } finally {
      setLoading(false);
    }
  };

  // Função para editar o produto
  const handleEdit = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.put(`http://localhost:8080/api/produtos/${productId}`, produto);
      alert("Produto atualizado com sucesso!");
    } catch (err) {
      setError("Erro ao editar o produto.");
    } finally {
      setLoading(false);
    }
  };

  // Atualiza os campos do produto enquanto o usuário edita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Consultar Produto</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Consultar Produto
          </Typography>
          <div>
            <label>
              ID do Produto:
              <input
                type="bigint"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </label>
            <button onClick={fetchProduto} disabled={loading}>
              Buscar
            </button>
          </div>

        {/* Mensagens de erro */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Exibe os campos do produto se encontrado */}
          {produto && (
            <div style={{ marginTop: "20px" }}>
              <label>
                Data:
                <input
                  type="date"
                  name="data"
                  value={produto.data || ""}
                  onChange={handleChange}
                />
              </label>
              <br/>
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  value={produto.nome || ""}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Preço:
                <input
                  type="number"
                  name="preco"
                  value={produto.precoUnitario || ""}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Quantidade:
                <input
                  type="int"
                  name="quantidade"
                  value={produto.quantidade || ""}
                  onChange={handleChange}
                />
              </label>
              <br />
              <button onClick={handleEdit} disabled={loading}>
                Editar
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}