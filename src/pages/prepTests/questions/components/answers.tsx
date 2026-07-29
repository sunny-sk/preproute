import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OPTION_KEYS, type OptionKey } from './question';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import Heading from './heading';

type AnswersProps = {
  value: OptionKey | "";
  options: Record<OptionKey, string>;
  onValueChange: (value: OptionKey | "") => void;
  setOption: (key: OptionKey, text: string) => void;
}

const Answers = ({ value, options, onValueChange, setOption }: AnswersProps) => {
  return (
    <div>
      <Heading title="Type the options below" />
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="gap-3"
      >
        {OPTION_KEYS.map((key, i) => (
          <div key={key} className="flex items-center gap-3">
            <RadioGroupItem
              value={key}
              aria-label={`Mark option ${i + 1} as correct`}
              className="size-5 border-line-strong"
            />
            <div className="relative flex-1">
              <Input
                value={options[key]}
                onChange={(e) => setOption(key, e.target.value)}
                placeholder="Type Option here"
                className="h-12 rounded-xl border-line pr-11 pl-4 text-sm"
              />
              <button
                type="button"
                onClick={() => setOption(key, "")}
                aria-label={`Clear option ${i + 1}`}
                title="Clear option"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-faint transition-colors hover:text-danger"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default Answers;