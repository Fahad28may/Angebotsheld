"use client";

import { useEffect } from "react";
import { useSessionStorageState } from "@/lib/hooks/useSessionStorageState";
import { track } from "@/lib/analytics";
import { createDefaultCompany, createDefaultCustomer, createDefaultMeta } from "@/lib/defaults";
import { calculateMalerLineItems, createDefaultMalerInput, type MalerCalculationInput } from "@/lib/calculations/maler";
import type { CompanyData, CustomerData, LineItem, QuoteMeta } from "@/lib/types";
import type { Step1Values, Step3Values } from "@/lib/schemas";
import { WizardShell } from "@/components/wizard/WizardShell";
import { SummaryPanel, MobileSummaryBar } from "@/components/wizard/SummaryPanel";
import { Step1CompanyCustomer } from "@/components/wizard/steps/Step1CompanyCustomer";
import { Step3LineItems } from "@/components/wizard/steps/DynamicStep3LineItems";
import { Step4Preview } from "@/components/wizard/steps/DynamicStep4Preview";
import { Step2Maler } from "./DynamicStep2Maler";

const STORAGE_KEY = "angebotsheld:maler";
const STEPS = ["Kundendaten", "Projektdaten", "Preise", "Vorschau"];

interface MalerWizardState {
  step: number;
  direction: number;
  company: CompanyData;
  customer: CustomerData;
  meta: QuoteMeta;
  calcInput: MalerCalculationInput;
  lineItems: LineItem[];
}

function createInitialState(): MalerWizardState {
  return {
    step: 0,
    direction: 1,
    company: createDefaultCompany(),
    customer: createDefaultCustomer(),
    meta: createDefaultMeta(),
    calcInput: createDefaultMalerInput(),
    lineItems: [],
  };
}

function mergeLineItems(newAutoItems: LineItem[], previous: LineItem[]): LineItem[] {
  const customItems = previous.filter((item) => !item.sourceKey);
  return [...newAutoItems, ...customItems].map((item, index) => ({ ...item, position: index + 1 }));
}

export function MalerWizard() {
  const [state, setState, clearState] = useSessionStorageState<MalerWizardState>(
    STORAGE_KEY,
    createInitialState()
  );

  useEffect(() => {
    track({ name: "Wizard Started", props: { trade: "maler" } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (step: number, direction: number) => setState((s) => ({ ...s, step, direction }));

  const handleStep1Next = (values: Step1Values) => {
    track({ name: "Wizard Step Completed", props: { trade: "maler", step: 1 } });
    setState((s) => ({
      ...s,
      company: values.company,
      customer: values.customer,
      meta: { ...s.meta, ...values.meta },
      step: 1,
      direction: 1,
    }));
  };

  const handleStep2Next = (calcInput: MalerCalculationInput) => {
    track({ name: "Wizard Step Completed", props: { trade: "maler", step: 2 } });
    setState((s) => {
      const autoItems = calculateMalerLineItems(calcInput);
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
    track({ name: "Wizard Step Completed", props: { trade: "maler", step: 3 } });
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
        summary={<SummaryPanel lineItems={state.lineItems} meta={state.meta} tradeLabel="Maler" />}
      >
        {state.step === 0 && (
          <Step1CompanyCustomer
            defaultValues={{ company: state.company, customer: state.customer, meta: state.meta }}
            onNext={handleStep1Next}
          />
        )}
        {state.step === 1 && (
          <Step2Maler
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
            tradeLabel="Maler"
            tradeKey="maler"
            onBack={() => goTo(2, -1)}
            onReset={handleReset}
          />
        )}
      </WizardShell>

      {state.step < 3 && <MobileSummaryBar lineItems={state.lineItems} meta={state.meta} tradeLabel="Maler" />}
    </div>
  );
}
