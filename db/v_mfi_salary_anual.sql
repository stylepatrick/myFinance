-- View: public.v_mfi_salary_anual

-- DROP VIEW public.v_mfi_salary_anual;

CREATE OR REPLACE VIEW public.v_mfi_salary_anual AS
 SELECT sum(a.sum) AS sum,
    sum(a.max) AS max,
    sum(a.min) AS min,
    round(sum(a.avg)::numeric, 2) AS avg,
    a.crby,
    a.year
   FROM ( SELECT sum(v_mfi_salary_grouped.value) AS sum,
            '0'::double precision AS max,
            0 AS min,
            0 AS avg,
            v_mfi_salary_grouped.crby,
            v_mfi_salary_grouped.year
           FROM v_mfi_salary_grouped
          GROUP BY v_mfi_salary_grouped.crby, v_mfi_salary_grouped.year
        UNION ALL
         SELECT '0'::double precision AS sum,
            max(v_mfi_salary_grouped.value) AS max,
            0 AS min,
            0 AS avg,
            v_mfi_salary_grouped.crby,
            v_mfi_salary_grouped.year
           FROM v_mfi_salary_grouped
          GROUP BY v_mfi_salary_grouped.crby, v_mfi_salary_grouped.year
        UNION ALL
         SELECT '0'::double precision AS sum,
            '0'::double precision AS max,
            min(v_mfi_salary_grouped.value) AS min,
            0 AS avg,
            v_mfi_salary_grouped.crby,
            v_mfi_salary_grouped.year
           FROM v_mfi_salary_grouped
          GROUP BY v_mfi_salary_grouped.crby, v_mfi_salary_grouped.year
        UNION ALL
         SELECT '0'::double precision AS sum,
            '0'::double precision AS max,
            0 AS min,
            avg(v_mfi_salary_grouped.value) AS avg,
            v_mfi_salary_grouped.crby,
            v_mfi_salary_grouped.year
           FROM v_mfi_salary_grouped
          GROUP BY v_mfi_salary_grouped.crby, v_mfi_salary_grouped.year) a
  GROUP BY a.crby, a.year;

ALTER TABLE public.v_mfi_salary_anual
    OWNER TO myfinance;


