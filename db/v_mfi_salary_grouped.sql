-- View: public.v_mfi_salary_grouped

-- DROP VIEW public.v_mfi_salary_grouped;

CREATE OR REPLACE VIEW public.v_mfi_salary_grouped AS
 SELECT to_char(mfi_salary.crdt, 'Month'::text) AS month_name,
    to_char(mfi_salary.crdt, 'MM'::text) AS month_index,
    date_part('year'::text, mfi_salary.crdt) AS year,
    mfi_salary.crby,
    mfi_salary.value
   FROM mfi_salary
  GROUP BY (to_char(mfi_salary.crdt, 'Month'::text)), (to_char(mfi_salary.crdt, 'MM'::text)), (date_part('year'::text, mfi_salary.crdt)), mfi_salary.crby, mfi_salary.value;

ALTER TABLE public.v_mfi_salary_grouped
    OWNER TO myfinance;


