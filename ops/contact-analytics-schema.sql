-- Counters only; no message content, contact details or visitor identifiers.
CREATE TABLE IF NOT EXISTS hpf_contact_clicks (
  day TEXT NOT NULL,
  event TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, event)
);

-- Page/locale/source attribution counters (zero PII).
CREATE TABLE IF NOT EXISTS hpf_contact_clicks_detail (
  day TEXT NOT NULL,
  event TEXT NOT NULL,
  lang TEXT NOT NULL,
  path TEXT NOT NULL,
  source_ref TEXT NOT NULL DEFAULT '',
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, event, lang, path, source_ref)
);
