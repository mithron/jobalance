<mapping xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <model model="api.Speciality">
        <xsl:for-each select="//prof">
            <item key="">
                <field name="name">
                    <xsl:value-of select=".//name"/>
                </field>
                <field name="link">
                    <xsl:value-of select=".//@about"/>
                </field>
                <field name="etks">
                    <xsl:value-of select=".//etks"/>
                </field>
            </item>    
        </xsl:for-each>
    </model>
</mapping>