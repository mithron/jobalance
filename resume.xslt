<mapping xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <model model="api.SimpleCV">
        <xsl:for-each select="//cv">
            <item key="">
                <field name="jobTitle">
                    <xsl:choose>
                         <xsl:when test="positionName">
                              <xsl:value-of select=".//positionName"/>
                         </xsl:when>
                         <xsl:otherwise>
                             ""
                        </xsl:otherwise>
                    </xsl:choose>
                </field>
                <field name="regionId">
                     <xsl:choose>
                         <xsl:when test="locality">
                              <xsl:value-of select=".//locality"/>
                         </xsl:when>
                         <xsl:otherwise>
                             ""
                        </xsl:otherwise>
                    </xsl:choose> 
                </field>
                <field name="salary">
                     <xsl:choose>
                         <xsl:when test="salary">
                              <xsl:value-of select=".//salary"/>
                         </xsl:when>
                         <xsl:otherwise>
                             0
                        </xsl:otherwise>
                    </xsl:choose> 
                </field>
                <field name="relocation">
                     <xsl:choose>
                         <xsl:when test="relocation">
                              <xsl:value-of select=".//relocation"/>
                         </xsl:when>
                         <xsl:otherwise>
                             false
                        </xsl:otherwise>
                    </xsl:choose>                 </field>
            </item>    
        </xsl:for-each>
    </model>
</mapping>