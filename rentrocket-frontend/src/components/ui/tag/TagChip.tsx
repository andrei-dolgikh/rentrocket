import {Chip} from "@nextui-org/chip";

type SizeType = "sm" | "md" | "lg" | undefined;

export function getColor(tagName: string): "primary" | "default" | "secondary" | "success" | "warning" | "danger" {
    const charCode = tagName.charCodeAt(0);
  
    const colorIndex = (charCode % 5);
  
    switch (colorIndex) {
      case 0:
        return "primary";
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "success";
      case 4:
        return "warning";
      default:
        return "danger"; 
    }
  }

export  function TagChip({ name, size = "md" }: 
    { name: string, size?: SizeType }) {
	return (
        <Chip radius="full" color={getColor(name)}  size={size} className=''>
            {name}
        </Chip>
	)
}



