import "./FlashDropdown.css";

export default function FlashDropdown({ onSelect }: { onSelect?: (value: string) => void }) {
    //const [open, setOpen] = useState(false);
    //const [selected, setSelected] = useState("2.5 Flash");

    const options = ["GminiIA", "openIA", "CloudIA"];

    const handleChange = (e) => {
        const value = e.target.value;
        if (onSelect) {
            onSelect(value);
        }
    };


    return (
        <div className="dropdown">
            <select onChange={handleChange}>
                {
                    options.map((option) => (
                        <option
                            key={option}
                            value={option}
                            selected={option === "geminiIA"}>
                                {option}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}
