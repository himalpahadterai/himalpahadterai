# Security Specification & Threat Model
## Himal Pahad Tarai Traders Pvt. Ltd.

### 1. Data Invariants
- **Public Read Access**: Anonymous/public visitors can read published products, published categories, published hero slides, public site settings, and published pages.
- **Draft & Archived Protection**: Unauthenticated users and unauthorized visitors CANNOT read draft or archived products, categories, or slides.
- **Enquiry Privacy**: Customer enquiries contain PII (Phone, Name, Email, Location, Message). Under no circumstances can unauthenticated users or unauthorized roles read or list from `/enquiries`. Only authorized staff (`super_admin` or `sales_staff`) can read enquiries.
- **Enquiry Submission**: Unauthenticated or authenticated users can submit (`create`) an enquiry provided strict payload schema constraints (name, phone, machineInterest, message, privacyConsent) are satisfied. Direct update/delete of enquiries by public users is prohibited.
- **Staff Profiles & Roles**: Only Super Admins can write to `/staffProfiles`. Regular users cannot assign themselves or elevate roles.
- **Site Settings & Pages**: Restricted to `super_admin` or `content_editor`.
- **Audit Logs**: Append-only log entries by authorized staff, immutable, cannot be edited or deleted.

### 2. The Dirty Dozen Payloads (Designed to Fail)
1. **Ghost Field Product**: Attempting to inject `{ ghostField: "hack" }` into `/products/prod-1`.
2. **Public Enquiry Snooping**: Anonymous request attempting to `list` or `get` `/enquiries`.
3. **Public Product Overwrite**: Unauthenticated user trying to `set` or `delete` `/products/prod-1`.
4. **Self-Role Escalation**: Anonymous user trying to create `/staffProfiles/my-uid` with `{ role: "super_admin" }`.
5. **Malicious Script Injection in Enquiry**: Enquiry with phone longer than 30 chars or message exceeding 3000 chars.
6. **Fake Enquiry Update by Public**: Public user attempting to `update` status of `/enquiries/enq-1` to `"closed"`.
7. **Bypassing Category Validation**: Unauthenticated visitor attempting to update or delete a category.
8. **Tampering with Audit Logs**: Staff attempting to delete an audit log or overwrite past timestamps.
9. **Settings Overwrite by Unauthenticated User**: Direct write to `/siteSettings/global` without super_admin / content_editor authorization.
10. **Product Status Tampering**: Unauthenticated caller modifying `status` from `draft` to `published`.
11. **ID Injection Poisoning**: Submitting document write with invalid path containing non-alphanumeric special characters.
12. **Blanket Query Scraping**: Malicious user executing unrestricted query on `/staffProfiles` or `/enquiries`.

### 3. Verification & Rules Blueprint
All dirty payloads will be rejected with `PERMISSION_DENIED` by the hardened `firestore.rules`.
