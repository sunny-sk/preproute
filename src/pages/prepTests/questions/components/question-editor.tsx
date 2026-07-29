import { Trash2 } from "lucide-react"

import DifficultyLevel from "@/components/difficulty-level"
import TopicSelect from "@/components/topic-select"
import SubTopicSelect from "@/components/sub-topic-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"

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
import { useShallow } from "zustand/react/shallow"

type QuestionEditorProps = {
  onChange: (next: QuestionDraft) => void
  onDeleteAll?: () => void
  onExit?: () => void
  onSubmit?: () => void
  subjectId?: string | null
}


const labelClass = "mb-2 block text-sm font-medium text-body"
const controlClass =
  "h-12 w-full rounded-lg border-line-strong px-4 text-sm text-body shadow-none placeholder:text-placeholder focus-visible:ring-2 data-[size=default]:h-12"

const QuestionEditor = ({
  onChange,
  onSubmit,
  subjectId = null,
}: QuestionEditorProps) => {
  const navigate = useNavigate();
  const {
    selectedQuestion,
    resetSelectedQuestion,
  } = useLoadedTest(useShallow((s) => {
    return {
      selectedQuestion: s.selectedQuestion,
      resetSelectedQuestion: s.resetSelectedQuestion,
    }
  }));


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
        className="flex items-center gap-1.5 text-sm font-medium text-danger transition-colors hover:text-danger-strong"
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

        <TopicSelect
          labelClass={labelClass}
          controlClass={controlClass}
          subjectId={subjectId}
          value={selectedQuestion?.topic ?? ""}
          onChange={(topicId) => {
            // reset the sub-topic since it belongs to the previous topic
            patch({ topic: topicId, sub_topic: "" })
          }}
        />

        <SubTopicSelect
          labelClass={labelClass}
          controlClass={controlClass}
          topicId={selectedQuestion?.topic ?? ""}
          value={selectedQuestion?.sub_topic ?? ""}
          onChange={(subTopicId) => patch({ sub_topic: subTopicId })}
        />

        {/* Media URL (optional) */}
        <Field className="space-y-2">
          <FieldLabel htmlFor="media-url" className={labelClass}>
            Media URL{" "}
            <span className="font-normal text-placeholder">(optional)</span>
          </FieldLabel>
          <Input
            id="media-url"
            type="url"
            value={selectedQuestion?.media_url ?? ""}
            onChange={(event) => patch({ media_url: event.target.value })}
            placeholder="https://example.com/image.png"
            className={controlClass}
          />
          {selectedQuestion?.media_url ? (
            <img
              src={selectedQuestion.media_url}
              alt="Question media preview"
              className="mt-2 max-h-48 rounded-xl border border-line object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none"
              }}
            />
          ) : null}
        </Field>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          onClick={handleExit}
          className="h-11 rounded-lg bg-danger-light px-6 text-sm font-medium text-white hover:bg-danger"
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
