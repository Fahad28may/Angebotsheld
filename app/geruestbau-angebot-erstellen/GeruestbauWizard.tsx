"use client";

import { useSessionStorageState } from "@/lib/hooks/useSessionStorageState";
import { createDefaultCompany, createDefaultCustomer, createDefaultMeta } from "@/lib/defaults";
import {
  calculateGeruestLineItems,
  createDefaultGeruestInput,
  type GeruestCalculationInput,
} from "@/lib/calculations/geruestbau";
import type { CompanyData, CustomerData, LineItem, QuoteMeta } from "@/lib/types";
import type { Step1Values, Step3Values } from "@/lib/schemas";
import { WizardShell } from "@/components/wizard/WizardShell";
import { SummaryPanel, MobileSummaryBar } from "@/components/wizard/SummaryPanel";
import { Step1CompanyCustomer } from "@/components/wizard/steps/Step1CompanyCustomer";
import { Step3LineItems } from "@/components/wizard/steps/Step3LineItems";
import { Step4Preview } from "@/components/wizard/steps/DynamicStep4Preview";
import { Step2Geruestbau } from "./Step2Geruestbau";

const STORAGE_KEY = "angebotsheld:geruestbau";
const STEPS = ["Kundendaten", "Projektdaten", "Preise", "Vorschau"];

interface GeruestbauWizardState {
  step: number;
  direction: number;
  company: CompanyData;
  customer: CustomerData;
  meta: QuoteMeta;
  calcInput: GeruestCalculationInput;
  lineItems: LineItem[];
}

function createInitialState(): GeruestbauWizardState {
  return {
    step: 0,
    direction: 1,
    company: createDefaultCompany(),
    customer: createDefaultCustomer(),
    meta: createDefaultMeta(),
    calcInput: createDefaultGeruestInput(),
    lineItems: [],
  };
}

function mergeLineItems(newAutoItems: LineItem[], previous: LineItem[]): LineItem[] {
  const customItems = previous.filter((item) => !item.sourceKey);
  return [...newAutoItems, ...customItems].map((item, index) => ({ ...item, position: index + 1 }));
}

export function GeruestbauWizard() {
  const [state, setState, clearState] = useSessionStorageState<GeruestbauWizardState>(
    STORAGE_KEY,
    createInitialState()
  );

  const goTo = (step: number, direction: number) => setState((s) => ({ ...s, step, direction }));

  const handleStep1Next = (values: Step1Values) => {
    setState((s) => ({
      ...s,
      company: values.company,
      customer: values.customer,
      meta: { ...s.meta, ...values.meta },
      step: 1,
      direction: 1,
    }));
  };

  const handleStep2Next = (calcInput: GeruestCalculationInput) => {
    setState((s) => {
      const autoItems = calculateGeruestLineItems(calcInput);
      return {
        ...s,
        calcInput,
        lineItems: mergeLineItems(autoItems, s.lineItems),
        step: 2,
        direction: 1,
      };
    });
  };

  const handleStep3Next = (values: Step3Values) => {
    setState((s) => ({
      ...s,
      lineItems: values.lineItems,
      meta: { ...s.meta, ...values.meta },
      step: 3,
      direction: 1,
    }));
  };

  const handleReset = () => {
    clearState();
    setState(createInitialState());
  };

  const quote = { company: state.company, customer: state.customer, meta: state.meta, lineItems: state.lineItems };

  return (
    <div>
      <WizardShell
        steps={STEPS}
        currentStep={state.step}
        direction={state.direction}
        stepKey={`step-${state.step}`}
        summary={<SummaryPanel lineItems={state.lineItems} meta={state.meta} tradeLabel="Gerüstbau" />}
      >
        {state.step === 0 && (
          <Step1CompanyCustomer
            defaultValues={{ company: state.company, customer: state.customer, meta: state.meta }}
            onNext={handleStep1Next}
          />
        )}
        {state.step === 1 && (
          <Step2Geruestbau
            defaultValues={state.calcInput}
            onNext={handleStep2Next}
            onBack={() => goTo(0, -1)}
          />
        )}
        {state.step === 2 && (
          <Step3LineItems
            defaultValues={{ lineItems: state.lineItems, meta: state.meta }}
            onNext={handleStep3Next}
            onBack={() => goTo(1, -1)}
          />
        )}
        {state.step === 3 && (
          <Step4Preview
            quote={quote}
            tradeLabel="Gerüstbau"
            onBack={() => goTo(2, -1)}
            onReset={handleReset}
          />
        )}
      </WizardShell>

      {state.step < 3 && (
        <MobileSummaryBar lineItems={state.lineItems} meta={state.meta} tradeLabel="Gerüstbau" />
      )}
    </div>
  );
}
