### Biblio_contributor




Fields:

-   Firstname

-   Initials

-   Lastname

-   Suffix


Taxonworks Mapping:

Create a new Person object with the following properties



| **Taxonworks Person Field** | **Scratchpads source**                             |
| --------------------------- | -------------------------------------------------- |
| Firstname                   | Firstname concatenated with Initials, if not empty |
| Lastname                    | lastname                                           |
| Suffix                      | suffix                                             |








## Taxonomy Term

Fields:

-   Field_reference

-   Name

-   Field_usage

-   field_rank

-   Field_authors


Mapping:

Create a new Protonym object with the following properties


| **Taxonworks field** | **Source**	|
| -------------------- | -----------------------------------	|
| name                 | The last part of name when split on whitespace	|
| Synonym              | Get the synonym Protonym representing the term’s associated accepted name, if any.<br>Get the field\_unacceptability\_reason from the associated accepted name<br>Create a new Synonym object with object\_taxon\_name set to the synonym Protonym and type set to the appropriate TaxonNameRelationshop class for the associated accepted name	|
| rank                 | Field\_rank	|
| roles                | Create an array of authors surnames by splitting Field\_authors split by “&” or “and”<br>Create an array of Person objects by mapping author surnames to Person objects with \`lastname\` set to the author surname<br>Create an array of TaxonNameAuthor records by mapping the array of Person objects to TaxonNameAuthor objects with \`person\` as the Person object and \`position\` as Author |
| source               | A taxonworks Source object representing the Biblio node in Field\_reference	|
| Parent               | Get the Taxonomy Term’s closest ancestor node with a different rank (ancestors with the same rank are synonyms)<br>Create a taxonwokrs Protonym object representing the ancestor TaxonomyTerm if present, or the Taxonworks project’s Root term	|
| Rank\_class          | Map field\_rank to the appropriate Taxonworks NomenclaturalRank subclass	|



## Location




-   Location mustbe split into three records:

-   Geographic item (spatial definition of area)

-   Geographic Area (nomenclatural details location name, political or cultural definition)

-   Georeference (information about a specific collection at a geographic item)





Fields:

-   title

-   field_continent_or_ocean

-   field_coordinate_system

-   field_coordinate_uncertainty

-   field_country

-   field_county

-   field_geodetic_datum

-   field_georeference_protocol

-   field_georeference_remarks

-   field_island_group

-   field_island

-   field_locality

-   field_map

-   field_max_depth

-   field_max_elevation

-   field_min_depth

-   field_min_elevation

-   field_state_province

-   field_locality_text





Mapping:

Create a new Geographic Item object with the following fields:
