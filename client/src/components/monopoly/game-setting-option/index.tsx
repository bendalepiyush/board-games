import styles from "./style.module.scss";
import MdiIcon from "@/components/mdi-icon";
import Switch from "../switch";

type OptionProps = {
  icon: string;
  subText: string;
  mainText: string;
  role: "ADMIN" | "VIEWER" | "PARTICIPANT";
  updateSetting: (value: boolean | number) => void;
  type: "SWITCH" | "SELECT";
  active?: boolean;
  selectedOption?: number;
  selectOptions?: { label: string; value: number }[];
};

const Option: React.FC<OptionProps> = ({
  role,
  icon,
  type,
  subText,
  mainText,
  updateSetting,
  selectOptions,
  selectedOption,
  active = false,
}) => {
  return (
    <div className={styles.optionContainer}>
      <div className={styles.icon}>
        <MdiIcon icon={icon} />
      </div>
      <div className={styles.textHolder}>
        <h3 className={styles.option}>{mainText}</h3>
        <p className={styles.subText}>{subText}</p>
      </div>
      <div>
        {type === "SWITCH" ? (
          <Switch
            onClick={() => updateSetting(!active)}
            isSwitched={active}
            disabled={role !== "ADMIN"}
          />
        ) : (
          <select
            value={selectedOption}
            onChange={(event: any) => {
              updateSetting(parseInt(event.target.value));
            }}
            disabled={role !== "ADMIN"}
            className={`${role !== "ADMIN" ? styles.disabled : ""}`}
          >
            {selectOptions &&
              selectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Option;
