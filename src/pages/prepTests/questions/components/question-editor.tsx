import { Trash2 } from "lucide-react"

import DifficultyLevel from "@/components/difficulty-level"
import Topic from "@/components/topic"
import { Button } from "@/components/ui/button"

import { useNavigate } from "react-router"
import Answers from "./answers"
import {
  type CorrectOption,
  type OptionKey,
  type QuestionDraft
} from "./question"
import RichTextEditor from "./rich-text-editor"
import Heading from "./heading"
import useLoadedTest from "@/store/useLoadedTest"

type QuestionEditorProps = {
  onChange: (next: QuestionDraft) => void
  onDeleteAll?: () => void
  onExit?: () => void
  onSubmit?: () => void
  subjectId?: string | null
}

const labelClass = "text-sm font-medium text-[#1f2a44]"
const controlClass =
  "h-12 w-full rounded-xl border-[#eef2fb] px-4 text-sm text-[#52607a] data-placeholder:text-[#9aa6be]"

const QuestionEditor = ({
  onChange,
  onSubmit,
  subjectId = null,
}: QuestionEditorProps) => {
  const navigate = useNavigate();
  const {
    selectedQuestion,
    resetSelectedQuestion,
  } = useLoadedTest()


  const patch = (partial: Partial<QuestionDraft>) =>
    onChange({ ...selectedQuestion!, ...partial })

  const setOption = (key: OptionKey, text: string) =>
    patch({ [key]: text } as Partial<QuestionDraft>)

  const handleExit = () => navigate("/")

  const handleDeleteAll = () => resetSelectedQuestion();

  if (!selectedQuestion) return null;

  return (
    <div className="space-y-6">
      {/* Delete all edits */}
      <button
        type="button"
        onClick={handleDeleteAll}
        className="flex items-center gap-1.5 text-sm font-medium text-[#e5646d] transition-colors hover:text-[#cf4b54]"
      >
        <Trash2 size={16} />
        Delete All Edits
      </button>

      {/* Question */}
      <RichTextEditor
        value={selectedQuestion?.question ?? ""}
        onChange={(html: string | undefined) => patch({ question: html ?? "" })}
        onClear={() => patch({ question: "" })}
        placeholder="Type here"
        editorClassName="min-h-[150px]"
      />

      {/* Options */}
      <Answers
        value={selectedQuestion.correct_option ?? ""}
        options={{
          option1: selectedQuestion.option1,
          option2: selectedQuestion.option2,
          option3: selectedQuestion.option3,
          option4: selectedQuestion.option4,
        }}
        onValueChange={(key: string) =>
          patch({ correct_option: key as CorrectOption })
        }
        setOption={setOption}
      />


      {/* Solution */}
      <div>
        <Heading title="Add Solution" />
        <RichTextEditor
          toolbar={false}
          value={selectedQuestion?.explanation ?? ""}
          onChange={(html: string | undefined) => patch({ explanation: html ?? "" })}
          onClear={() => patch({ explanation: "" })}
          placeholder="Type here"
          editorClassName="min-h-[150px]"
        />
      </div>

      {/* Question settings */}
      <div className="space-y-5">
        <Heading title="Question settings" />

        <DifficultyLevel
          value={selectedQuestion?.difficulty ?? ""}
          onChange={(difficulty) => patch({ difficulty: difficulty ?? "" })}
        />

        <Topic
          labelClass={labelClass}
          controlClass={controlClass}
          subjectId={subjectId}
          value={selectedQuestion?.topic ?? []}
          onChange={(topicIds) => patch({ topic: topicIds })}
        />

        {/* TODO:// */}
        {/* <div className="space-y-2">
          <label className={labelClass}>Sub-topic</label>
          <Select
            value={value.sub_topic || null}
            onValueChange={(v: string | null) => patch({ sub_topic: v ?? "" })}
          >
            <SelectTrigger className={controlClass}>
              <SelectValue placeholder="Select from Drop-down" />
            </SelectTrigger>
            <SelectContent>
              {subTopicOptions.map((subTopic) => (
                <SelectItem key={subTopic} value={subTopic}>
                  {subTopic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          onClick={handleExit}
          className="h-11 rounded-lg bg-[#ef8a8f] px-6 text-sm font-medium text-white hover:bg-[#e5646d]"
        >
          Exit Test Creation
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          className="h-11 rounded-lg px-10 text-sm font-medium"
        >
          Next
        </Button>
      </div>
    </div>
  )
};

export default QuestionEditor
