-- Counters only; no message content, contact details or visitor identifiers.
CREATE TABLE IF NOT EXISTS hpf_contact_clicks (
  day TEXT NOT NULL,
  event TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, event)
);
