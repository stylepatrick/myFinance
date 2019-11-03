-- View: public.v_mfi_bills_last_month_patrick_gaby

-- DROP VIEW public.v_mfi_bills_last_month_patrick_gaby;

CREATE OR REPLACE VIEW public.v_mfi_bills_last_month_patrick_gaby AS
 SELECT sum(a.summe) AS sum,
    sum(a.gaby) AS gaby,
    sum(a.patrick) AS patrick,
    sum(a.gaby) / 2::double precision + sum(a.patrick) / 2::double precision - sum(a.gaby) AS gaby_delta,
    sum(a.patrick) / 2::double precision + sum(a.gaby) / 2::double precision - sum(a.patrick) AS patrick_delta
   FROM ( SELECT sum(v_mfi_bills_grouped.amount) AS summe,
            0 AS gaby,
            0 AS patrick
           FROM v_mfi_bills_grouped
          WHERE v_mfi_bills_grouped.month_index::double precision = date_part('month'::text, CURRENT_DATE - '1 mon'::interval) AND v_mfi_bills_grouped.year = date_part('year'::text, CURRENT_DATE - '1 mon'::interval)
        UNION ALL
         SELECT 0,
            v_mfi_bills_grouped.amount AS a,
            0
           FROM v_mfi_bills_grouped
          WHERE v_mfi_bills_grouped.month_index::double precision = date_part('month'::text, CURRENT_DATE - '1 mon'::interval) AND v_mfi_bills_grouped.year = date_part('year'::text, CURRENT_DATE - '1 mon'::interval) AND v_mfi_bills_grouped.crby::text = 'gaby'::text
        UNION ALL
         SELECT 0,
            0,
            v_mfi_bills_grouped.amount AS b
           FROM v_mfi_bills_grouped
          WHERE v_mfi_bills_grouped.month_index::double precision = date_part('month'::text, CURRENT_DATE - '1 mon'::interval) AND v_mfi_bills_grouped.year = date_part('year'::text, CURRENT_DATE - '1 mon'::interval) AND v_mfi_bills_grouped.crby::text = 'patrick'::text) a;

ALTER TABLE public.v_mfi_bills_last_month_patrick_gaby
    OWNER TO myfinance;


