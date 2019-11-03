-- View: public.v_mfi_bills_grouped

-- DROP VIEW public.v_mfi_bills_grouped;

CREATE OR REPLACE VIEW public.v_mfi_bills_grouped AS
 SELECT to_char(mfi_bills.crdt, 'Month'::text) AS month_name,
    to_char(mfi_bills.crdt, 'MM'::text) AS month_index,
    date_part('year'::text, mfi_bills.crdt) AS year,
    sum(mfi_bills.value) AS amount,
    mfi_bills.crby
   FROM mfi_bills
  GROUP BY (to_char(mfi_bills.crdt, 'Month'::text)), (to_char(mfi_bills.crdt, 'MM'::text)), (date_part('year'::text, mfi_bills.crdt)), mfi_bills.crby;

ALTER TABLE public.v_mfi_bills_grouped
    OWNER TO myfinance;


