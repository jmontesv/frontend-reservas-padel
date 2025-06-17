import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface VerHorariosButtonProps {
  pistaId: string;
}

export function VerHorariosButton({ pistaId }: VerHorariosButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pistas/${pistaId}/horarios`);
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Ver horarios
    </Button>
  );
}
