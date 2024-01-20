// Import necessary hooks and components
import { submitComment } from "@/data/actions";
import { FormEvent, useEffect, useState } from "react";
import { Headline } from "../common";
import { useFormState, useFormStatus } from "react-dom";

type CommentFormProps = {
  blogId: number;
};

const initialState = {
  message: "",
  isError: false,
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  useEffect(() => {
    console.log(pending);
  }, [pending]);

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="btn btn-primary"
    >
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        "Kommentar absenden"
      )}
    </button>
  );
}

export const CommentForm: React.FC<CommentFormProps> = ({ blogId }) => {
  const [state, formAction] = useFormState(submitComment, initialState);

  return (
    <div className="border-t border-border mt-14 pt-14" id="kommentare">
      <Headline variant="h4" as="h4">
        Eure Kommentare
      </Headline>
      {state?.isError && (
        <div role="alert" className="alert mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span>{state.message}</span>
        </div>
      )}

      {state?.isSuccess && <span>{state.message}</span>}

      {!state?.isSuccess && (
        <form action={formAction} className="flex flex-col gap-8">
          <input
            type="hidden"
            id="blogId"
            name="blogId"
            value={blogId}
            required
          />

          <fieldset className="flex flex-col">
            <label htmlFor="author" className="font-bold mb-1">
              Name
            </label>

            <input
              type="text"
              id="author"
              name="author"
              placeholder="Max Mustermann"
              required
              className="input input-bordered w-full py-2 px-4"
              maxLength={20}
              minLength={3}
            />
          </fieldset>

          <fieldset className="flex flex-col">
            <label htmlFor="text" className="font-bold mb-1">
              Kommentar
            </label>

            <textarea
              id="text"
              name="text"
              placeholder="Kommentar eingeben"
              required
              className="textarea textarea-bordered resize-none py-2 px-4 h-40 font-serif text-xl"
              maxLength={250}
              minLength={3}
            />
          </fieldset>

          <SubmitButton />
        </form>
      )}
    </div>
  );
};
