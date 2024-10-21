import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get(
          `https://6638fbab4253a866a24fe2c5.mockapi.io/Items/` + id
        );
        setPizza(res.data);
      } catch (error) {
        alert("error");
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);
  if (!pizza) {
    return "загрузка";
  }
  return (
    <div>
      <h1>{pizza.title}</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        voluptatum quis eum omnis tenetur, earum obcaecati? Voluptatibus
        voluptatem adipisci eum? Est officia iure dolore id iste excepturi culpa
        perferendis tempora!
      </p>
      <p>{pizza.price}</p>
    </div>
  );
};

export default FullPizza;
