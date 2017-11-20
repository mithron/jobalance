<mapping xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <model model="api.Region">
        <xsl:for-each select="//region">
            <item key="">
                <field name="name">
                    <xsl:value-of select=".//name"/>
                </field>
                <field name="link">
                    <xsl:value-of select=".//@about"/>
                </field>
                <field name="regionId">
                    <xsl:value-of select=".//code"/>
                </field>
            </item>    
        </xsl:for-each>
    </model>
</mapping>