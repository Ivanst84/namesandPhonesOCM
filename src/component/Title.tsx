
interface titleProps{
  mensaje: string;
}
const Title: React.FC<titleProps> = ({mensaje}) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-100 mb-6 text-center">{mensaje}</h1>
    
    </>
  );
};

export default Title;
