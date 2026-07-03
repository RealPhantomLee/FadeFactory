"use client";

import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import type { BookingDraft, Customer, TimeSlot } from "@/lib/booking/types";

export enum Step {
  Services = 0,
  DateTime = 1,
  Details = 2,
  Confirmation = 3,
}

export const STEP_LABELS = ["Service", "Date & Time", "Your Details", "Confirmed"] as const;

type State = {
  step: Step;
  draft: BookingDraft;
  confirmationId?: string;
};

type Action =
  | { type: "TOGGLE_SERVICE"; id: string }
  | { type: "SET_DATE"; date: string }
  | { type: "SET_SLOT"; slot: TimeSlot }
  | { type: "SET_CUSTOMER"; customer: Customer }
  | { type: "SET_CONFIRMATION"; id: string }
  | { type: "GOTO_STEP"; step: Step }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "RESET" }
  | { type: "HYDRATE"; state: State };

const initialState: State = { step: Step.Services, draft: { serviceIds: [] } };

const STORAGE_KEY = "ff-booking-draft";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_SERVICE": {
      const has = state.draft.serviceIds.includes(action.id);
      const serviceIds = has
        ? state.draft.serviceIds.filter((id) => id !== action.id)
        : [...state.draft.serviceIds, action.id];
      // Changing services invalidates a previously chosen slot.
      return { ...state, draft: { ...state.draft, serviceIds, slot: undefined } };
    }
    case "SET_DATE":
      return { ...state, draft: { ...state.draft, date: action.date, slot: undefined } };
    case "SET_SLOT":
      return { ...state, draft: { ...state.draft, slot: action.slot } };
    case "SET_CUSTOMER":
      return { ...state, draft: { ...state.draft, customer: action.customer } };
    case "SET_CONFIRMATION":
      return { ...state, confirmationId: action.id, step: Step.Confirmation };
    case "GOTO_STEP":
      return { ...state, step: action.step };
    case "NEXT":
      return { ...state, step: Math.min(state.step + 1, Step.Confirmation) };
    case "BACK":
      return { ...state, step: Math.max(state.step - 1, Step.Services) };
    case "RESET":
      return initialState;
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

type BookingContextValue = { state: State; dispatch: React.Dispatch<Action> };
const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children, seedServiceId }: { children: ReactNode; seedServiceId?: string }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Restore an in-progress draft, then seed a service from the URL if provided.
  useEffect(() => {
    let restored = initialState;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) restored = JSON.parse(raw) as State;
    } catch {
      /* ignore malformed storage */
    }
    if (restored !== initialState) dispatch({ type: "HYDRATE", state: restored });
    if (seedServiceId && !restored.draft.serviceIds.includes(seedServiceId)) {
      dispatch({ type: "TOGGLE_SERVICE", id: seedServiceId });
    }
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist the draft so a refresh mid-flow doesn't lose progress.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
